const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

async function ensureOrdersId(orderId) {
  // noop helper placeholder
  return orderId;
}

router.post('/api/orders/buy-now', async (req, res, next) => {
  try {
    const userId = req.body.userId || '1';
    const notificationMessage = req.body.message || 'Thanks for your purchase!';

    // Create order id
    const orderId = `ord_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

    // Load cart items
    const { rows: cartRows } = await query(
      `SELECT sku, qty FROM cart_items WHERE user_id = ? AND qty > 0`,
      [userId]
    );

    if (!cartRows.length) {
      const err = new Error('Cart is empty');
      err.statusCode = 400;
      throw err;
    }

    // Create order
    await query(
      `INSERT INTO orders (id, user_id, status) VALUES (?, ?, ?)`,
      [orderId, userId, 'PAID']
    );

    // Create order_items
    for (const it of cartRows) {
      await query(
        `INSERT INTO order_items (id, order_id, sku, name, image_url, unit_cost, qty, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          `oi_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
          orderId,
          it.sku,
          it.sku, // name best-effort
          null,
          0, // unit_cost best-effort
          it.qty,
          null,
        ]
      );
    }

    // Notification
    await query(
      `INSERT INTO notifications (id, user_id, type, ref_id, message)
       VALUES (?, ?, 'OFFER', ?, ?)`,
      [
        `n_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
        userId,
        orderId,
        notificationMessage,
      ]
    );

    // Clear cart items
    await query(`DELETE FROM cart_items WHERE user_id = ?`, [userId]);

    res.json({ ok: true, order: { id: orderId, status: 'PAID' } });
  } catch (e) {
    next(e);
  }
});

router.get('/api/orders', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';

    const { rows: orderRows } = await query(
      `SELECT id, status, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    const orderIds = orderRows.map((o) => o.id);
    let itemsByOrder = {};

    if (orderIds.length) {
      const { rows: itemRows } = await query(
        `SELECT order_id, sku, name, image_url, unit_cost, qty, description
         FROM order_items WHERE order_id IN (?)`,
        [orderIds]
      );

      itemsByOrder = itemRows.reduce((acc, r) => {
        acc[r.order_id] = acc[r.order_id] || [];
        acc[r.order_id].push({
          sku: r.sku,
          name: r.name,
          image_url: r.image_url,
          unit_cost: r.unit_cost,
          qty: r.qty,
          description: r.description,
        });
        return acc;
      }, {});
    }

    const orders = orderRows.map((o) => ({
      id: o.id,
      status: o.status,
      created_at: o.created_at,
      items: itemsByOrder[o.id] || [],
    }));

    res.json({ ok: true, orders });
  } catch (e) {
    next(e);
  }
});


const port = process.env.PORT || 3005;
createServer({ name: 'orders', port, routes: router });

