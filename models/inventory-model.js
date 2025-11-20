// models/inventory-model.js

const { Pool } = require('pg'); // or mysql2, etc.

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;


async function getVehicleById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1"
    const result = await pool.query(sql, [inv_id])
    return result.rows[0]
  } catch (err) {
    console.error(err)
    throw err
  }
}

module.exports = { getVehicleById }
