const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/payments', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';
    await query('SELECT $1::text as user_id', [userId]);
    res.json({ ok: true, payments: [{ id: 'pay1', status: 'SUCCESS' }] });
  } catch (e) {
    next(e);
  }
});

router.post('/api/payments/checkout', async (req, res, next) => {
  try {
    await query('SELECT 1');
    res.json({ ok: true, payment: { status: 'SUCCESS', echo: req.body } });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3006;
createServer({ name: 'payments', port, routes: router });

