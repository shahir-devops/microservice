const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/orders', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';
    await query('SELECT $1::text as user_id', [userId]);
    res.json({ ok: true, orders: [{ id: 'ord1', status: 'PAID' }] });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3005;
createServer({ name: 'orders', port, routes: router });

