const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/helpcenter', async (req, res, next) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, faqs: [{ id: 'f1', q: 'How to order?', a: 'Go to cart and checkout.' }] });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3007;
createServer({ name: 'helpcenter', port, routes: router });

