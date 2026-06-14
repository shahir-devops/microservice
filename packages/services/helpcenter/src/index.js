const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/helpcenter', async (req, res, next) => {
  try {
    const { rows } = await query(
      `SELECT id, q, a FROM faqs ORDER BY id DESC LIMIT 100`,
      []
    );
    res.json({ ok: true, faqs: rows });
  } catch (e) {
    next(e);
  }
});

router.post('/api/helpcenter/contact', async (req, res, next) => {
  try {
    const {
      userId,
      name,
      email,
      message,
    } = req.body || {};

    if (!name || !email || !message) {
      const err = new Error('Missing required fields: name, email, message');
      err.statusCode = 400;
      throw err;
    }

    const id = `hc_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

    await query(
      `INSERT INTO helpcenter_contact_messages (id, user_id, name, email, message)
       VALUES (?, ?, ?, ?, ?)`,
      [id, userId || null, name, email, message]
    );

    res.json({ ok: true, id });
  } catch (e) {
    next(e);
  }
});

const port = process.env.PORT || 3007;
createServer({ name: 'helpcenter', port, routes: router });


