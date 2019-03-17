// set up the configuration of PostgreSQL connection.
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
console.log('dot');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

module.exports = { pool };
