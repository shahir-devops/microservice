const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/cart', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';
    await query('SELECT $1::text as user_id', [userId]);
    res.json({ ok: true, cart: { userId, items: [{ sku: 'SKU-1', qty: 2 }] } });
  } catch (e) {
    next(e);
  }
});

router.post('/api/cart/items', async (req, res, next) => {
  try {
    res.json({ ok: true, saved: req.body });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3002;
createServer({ name: 'cart', port, routes: router });

