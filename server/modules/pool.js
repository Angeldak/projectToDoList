const pg = require("pg");
const url = require("url");

let config = {};

if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  };
} else {
  config = {
    host: "localhost",
    port: 5432,
    database: "weekend-to-do-app",
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

const pool = new pg.Pool(config);

pool.on("connect", () => {
  console.log("Connected to PostGres");
});

pool.on("error", (error) => {
  console.log("Error in PostGres", error);
});

module.exports = pool;
