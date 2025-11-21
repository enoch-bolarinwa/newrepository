// models/inventory-model.js
const pool = require('../database'); // adjust to your DB connection

/**
 * Returns a single vehicle object or null.
 * Uses parameterized query (prepared statement).
 */
async function getVehicleById(inv_id) {
  const sql = `
    SELECT inv_id, make, model, year, price, mileage, exterior_color, interior_color,
           fuel_type, drivetrain, transmission, stock, vin, fullsize_image_url, description
    FROM inventory
    WHERE inv_id = $1
    LIMIT 1;
  `;

  // For mysql2 you'd use ? placeholders; for postgres use $1, $2...
  const params = [inv_id];

  try {
    const result = await pool.query(sql, params);
    // If using mysql2: result[0]
    if (!result || !result.rows || result.rows.length === 0) return null;
    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getVehicleById,
};
