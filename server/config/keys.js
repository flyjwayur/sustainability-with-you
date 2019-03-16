// set up the configuration of PostgreSQL connection.
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'hyesoo',
  host: 'localhost',
  database: 'api',
  password: 'hyesoo0987',
  port: 5432,
});

module.exports = { pool };
