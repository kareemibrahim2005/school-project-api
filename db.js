const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "school1",
  password: "2005",
  port: "5432",
});

module.exports = pool;
