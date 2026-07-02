const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'kanbandb',
  user: process.env.DB_USER || 'kanbanuser',
  password: process.env.DB_PASSWORD || 'kanbanpass',
});

module.exports = pool;
