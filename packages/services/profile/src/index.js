const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/profile', async (req, res, next) => {
  try {
    // stub: expected to fetch profile from RDS
    const userId = req.query.userId || '1';
    const result = await query('SELECT $1::text as user_id', [userId]);
    res.json({ ok: true, profile: { userId, row: result.rows[0] } });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3001;
createServer({
  name: 'profile',
  port,
  routes: router
});

