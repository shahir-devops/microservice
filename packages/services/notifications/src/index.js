const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/notifications', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';

    const { rows } = await query(
      `SELECT id, type, ref_id, message, created_at
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 100`,
      [userId]
    );

    res.json({ ok: true, notifications: rows });
  } catch (e) {
    next(e);
  }
});


const port = process.env.PORT || 3003;
createServer({ name: 'notifications', port, routes: router });

