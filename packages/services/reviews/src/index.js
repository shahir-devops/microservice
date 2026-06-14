const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/reviews', async (req, res, next) => {
  try {
    const userId = req.query.userId;

    const { rows } = await query(
      `SELECT id, user_id, order_id, sku, rating, text, created_at
       FROM reviews
       ${userId ? 'WHERE user_id = ?' : ''}
       ORDER BY created_at DESC
       LIMIT 200`,
      userId ? [userId] : []
    );

    res.json({ ok: true, reviews: rows });
  } catch (e) {
    next(e);
  }
});

// Optional: creating reviews can be added later if the UI supports it.

const port = process.env.PORT || 3009;
createServer({ name: 'reviews', port, routes: router });


