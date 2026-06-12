const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/address', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';
    await query('SELECT $1::text as user_id', [userId]);
    res.json({ ok: true, addresses: [{ id: 'a1', line1: '123 Main St' }] });
  } catch (e) {
    next(e);
  }
});

router.post('/api/address', async (req, res, next) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, saved: req.body });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3008;
createServer({ name: 'address', port, routes: router });

