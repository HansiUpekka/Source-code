require("dotenv").config();

const { Pool } = require("pg");
const keys = require("../../key");

const pool = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

const initializeDatabase = async () => {
  const client = await pool.connect();

  try {
    await client.query("CREATE TABLE IF NOT EXISTS numbers (number INT)");

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await client.query(`
      ALTER TABLE users
      ALTER COLUMN created_at SET DEFAULT NOW()
    `);

    await client.query(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'users' AND column_name = 'password'
        ) AND NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'users' AND column_name = 'password_hash'
        ) THEN
          ALTER TABLE users RENAME COLUMN password TO password_hash;
        END IF;
      END $$;
    `);
  } finally {
    client.release();
  }
};

const waitForDatabase = async () => {
  const maxAttempts = 20;
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await initializeDatabase();
      return;
    } catch (error) {
      lastError = error;
      console.log(`PG ERROR: database not ready on attempt ${attempt}`);

      if (attempt < maxAttempts) {
        await sleep(1000);
      }
    }
  }

  throw lastError;
};

module.exports = pool;
module.exports.waitForDatabase = waitForDatabase;
