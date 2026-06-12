const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/reviews', async (req, res, next) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, reviews: [{ id: 'r1', rating: 5, text: 'Great!' }] });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3009;
createServer({ name: 'reviews', port, routes: router });

