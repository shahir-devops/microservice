const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/profile', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';
    const result = await query(
      'SELECT user_id, username, display_name, phone_number, image_url, email, updated_at FROM profiles WHERE user_id = ?',
      [userId],
    );
    const row = result.rows[0] || null;
    res.json({ ok: true, profile: row ? { userId, row } : null, row });
  } catch (e) {
    next(e);
  }
});

router.post('/api/profile', async (req, res, next) => {
  try {
    const { userId = '1', username, displayName, phoneNumber, imageUrl } = req.body || {};

    if (!username || !displayName) {
      return res.status(400).json({ ok: false, message: 'username and displayName are required' });
    }

    await query(
      'INSERT INTO profiles (user_id, username, display_name, phone_number, image_url) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE username = VALUES(username), display_name = VALUES(display_name), phone_number = VALUES(phone_number), image_url = VALUES(image_url), updated_at = CURRENT_TIMESTAMP',
      [userId, username, displayName, phoneNumber || null, imageUrl || null],
    );

    const result = await query(
      'SELECT user_id, username, display_name, phone_number, image_url, email, updated_at FROM profiles WHERE user_id = ?',
      [userId],
    );
    const row = result.rows[0] || null;

    res.json({ ok: true, profile: { userId, row }, row });
  } catch (e) {
    next(e);
  }
});

router.post('/api/profile/delete', async (req, res, next) => {
  try {
    const { userId = '1' } = req.body || {};
    await query('DELETE FROM profiles WHERE user_id = ?', [userId]);
    res.json({ ok: true });
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

