const { Pool } = require('pg');
const { env } = require('./env');

const pool = new Pool({
  // For AWS RDS Postgres, set DATABASE_URL to your RDS connection string.
  // Example:
  // DATABASE_URL=postgres://USER:PASSWORD@RDS_HOST:5432/DB_NAME
  connectionString: env('DATABASE_URL')
});

async function query(text, params) {
  return pool.query(text, params);
}

module.exports = {
  pool,
  query
};

