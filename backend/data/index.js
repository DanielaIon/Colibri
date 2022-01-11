const { Pool } = require('pg');

const pool = new Pool({
  log: (msg) => console.log(msg)
});

const query = async (text, params) => {
  const start = Date.now();
  const {
    rows,
  } = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log(`Query took ${duration} and returned ${rows.length} rows.`);
  return rows;
};

module.exports = {
  query,
};
