const express = require('express');
const { createServer } = require('../base-server/src/server');
const { query } = require('@micro/shared');

const router = express.Router();

router.get('/api/address', async (req, res, next) => {
  try {
    const userId = req.query.userId || '1';

    const { rows } = await query(
      `SELECT id, user_id, line1, line2, street, landmark, location, city, state, country, postal_code, pincode, updated_at
       FROM addresses
       WHERE user_id = ?
       ORDER BY updated_at DESC
       LIMIT 20`,
      [userId]
    );

    res.json({ ok: true, addresses: rows });
  } catch (e) {
    next(e);
  }
});

router.post('/api/address', async (req, res, next) => {
  try {
    const {
      userId = '1',
      id,
      line1,
      line2,
      street,
      landmark,
      location,
      city,
      state,
      country,
      postalCode,
      pincode,
    } = req.body || {};

    if (!line1) {
      const err = new Error('Missing required field: line1');
      err.statusCode = 400;
      throw err;
    }

    const addrId = id || `a_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;

    // Upsert by explicit id if provided; otherwise insert (schema doesn't enforce uniqueness).
    await query(
      `INSERT INTO addresses (id, user_id, line1, line2, street, landmark, location, city, state, country, postal_code, pincode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         line1 = VALUES(line1),
         line2 = VALUES(line2),
         street = VALUES(street),
         landmark = VALUES(landmark),
         location = VALUES(location),
         city = VALUES(city),
         state = VALUES(state),
         country = VALUES(country),
         postal_code = VALUES(postal_code),
         pincode = VALUES(pincode),
         updated_at = CURRENT_TIMESTAMP`,
      [
        addrId,
        userId,
        line1,
        line2 || null,
        street || null,
        landmark || null,
        location || null,
        city || null,
        state || null,
        country || null,
        postalCode || null,
        pincode || null,
      ]
    );

    res.json({ ok: true, address: { id: addrId } });
  } catch (e) {
    next(e);
  }
});


const port = process.env.PORT || 3008;
createServer({ name: 'address', port, routes: router });

