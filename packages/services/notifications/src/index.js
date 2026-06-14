const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/notifications', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';
    await query('SELECT ? as user_id', [userId]);
    res.json({ ok: true, notifications: [{ id: 'n1', message: 'Welcome!' }] });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3003;
createServer({ name: 'notifications', port, routes: router });

