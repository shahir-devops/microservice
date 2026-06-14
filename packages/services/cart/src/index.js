const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

// Ensure cart row exists, insert empty carts row if missing.
async function ensureCartRow(userId) {
  await query(
    `INSERT INTO carts (user_id, updated_at) VALUES (?, CURRENT_TIMESTAMP)
     ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP`,
    [userId]
  );
}

router.get('/api/cart', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';
    await ensureCartRow(userId);

    const { rows } = await query(
      `SELECT sku, qty, name, description, image_url, unit_cost
       FROM cart_items
       LEFT JOIN (
         SELECT 1 as dummy
       ) d ON 1=0
       WHERE user_id = ?`,
      [userId]
    );

    // cart_items schema currently only has (user_id, sku, qty).
    // Return best-effort fields for UI.
    const items = rows.map((r) => ({
      sku: r.sku,
      qty: Number(r.qty),
      name: r.name || r.sku,
      description: r.description || null,
      image_url: r.image_url || null,
      unit_cost: r.unit_cost != null ? Number(r.unit_cost) : 0,
    }));

    res.json({ ok: true, cart: { userId, items } });
  } catch (e) {
    next(e);
  }
});

router.post('/api/cart/items', async (req, res, next) => {
  try {
    const userId = req.body.userId || '1';
    const sku = req.body.sku;
    const qty = Number(req.body.qty);

    if (!sku) {
      const err = new Error('Missing required field: sku');
      err.statusCode = 400;
      throw err;
    }
    if (Number.isNaN(qty)) {
      const err = new Error('Missing/invalid required field: qty');
      err.statusCode = 400;
      throw err;
    }

    await ensureCartRow(userId);

    if (qty <= 0) {
      await query(`DELETE FROM cart_items WHERE user_id = ? AND sku = ?`, [userId, sku]);
      return res.json({ ok: true, cartItem: null });
    }

    await query(
      `INSERT INTO cart_items (user_id, sku, qty)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE qty = VALUES(qty)`,
      [userId, sku, qty]
    );

    res.json({ ok: true, cartItem: { userId, sku, qty } });
  } catch (e) {
    next(e);
  }
});


const port = process.env.PORT || 3002;
createServer({ name: 'cart', port, routes: router });

