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

pool.on("connect", client => {
  client.query("CREATE TABLE IF NOT EXISTS numbers (number INT)").catch(err => {
    console.log("PG ERROR:", err);
  });
});

module.exports = pool;
