const mysql = require('mysql2/promise');
const { env } = require('./env');

// Expect a DATABASE_URL of the form: mysql://USER:PASSWORD@HOST:PORT/DB_NAME
const pool = mysql.createPool({
  uri: env('DATABASE_URL'),
  connectionLimit: 10,
  // RDS MySQL often requires TLS.
  // mysql2 will honor SSL when `ssl` is provided.
  ssl: {
    // For AWS RDS you may need CA verification; enabling rejectUnauthorized=false is common for quick setup.
    rejectUnauthorized: false,
  },
});


async function query(text, params) {
  // Convert Postgres-style placeholders ($1, $2, ...) to MySQL (?)
  const normalizedText = String(text).replace(/\$(\d+)/g, '?');
  const [rows] = await pool.execute(normalizedText, params);
  return { rows };
}

module.exports = {
  pool,
  query,
};


