const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();




router.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'email and password required' });
    }

    // NOTE: This is scaffold-level validation.
    // For real security, store hashed passwords and use bcrypt/argon2.
    const result = await query(
      'SELECT id, email, password_hash FROM users WHERE email = $1 LIMIT 1',
      [email]
    );

    const user = result?.rows?.[0];
    if (!user || user.password_hash !== password) {
      return res.status(401).json({ ok: false, error: 'invalid credentials' });
    }

    // Dev token (placeholder). In a real app, use JWT and verify on protected calls.
    const token = `dev-token:${user.id}`;
    res.json({ ok: true, token, user: { id: user.id, email: user.email } });
  } catch (e) {
    next(e);
  }
});

router.post('/api/auth/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'email and password required' });
    }

    const existing = await query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email]);
    const existingUser = existing?.rows?.[0];

    if (existingUser) {
      return res.status(409).json({ ok: false, error: 'email already exists' });
    }

    // Scaffold signup for TEXT ids:
    // dev-safe approach: create a deterministic user id (email -> safe text).
    const userId = `u:${Buffer.from(String(email)).toString('base64')}`;

    await query(
      'INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3) ',
      [userId, email, password]
    );

    const token = `dev-token:${userId}`;

    res.json({
      ok: true,
      token,
      user: { id: userId, email },
    });
  } catch (e) {
    next(e);
  }
});

router.get('/api/auth/me', async (req, res, next) => {
  try {
    const auth = req.headers['authorization'] || '';
    if (!auth.startsWith('Bearer ')) {
      return res.status(401).json({ ok: false, error: 'unauthorized' });
    }

    const token = auth.slice('Bearer '.length);
    if (!token.startsWith('dev-token:')) {
      return res.status(401).json({ ok: false, error: 'invalid token' });
    }

    const userId = token.slice('dev-token:'.length);

    const result = await query('SELECT id, email FROM users WHERE id = $1', [userId]);
    const user = result?.rows?.[0];

    if (!user) {
      return res.status(401).json({ ok: false, error: 'invalid token' });
    }

    res.json({ ok: true, user });
  } catch (e) {
    next(e);
  }
});



const port = process.env.PORT || 3010;
createServer({ name: 'auth', port, routes: router });


