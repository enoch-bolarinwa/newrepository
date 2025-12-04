const db = require("../database")

// Add a favorite
async function addFavorite(account_id, inv_id) {
  try {
    const sql = `
      INSERT INTO favorites (account_id, inv_id)
      VALUES ($1, $2)
      ON CONFLICT (account_id, inv_id) DO NOTHING
      RETURNING *
    `;
    const result = await db.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (err) {
    console.error("addFavorite error:", err)
    return null
  }
}

// Remove a favorite
async function removeFavorite(account_id, inv_id) {
  try {
    const sql = `
      DELETE FROM favorites
      WHERE account_id = $1 AND inv_id = $2
      RETURNING *
    `;
    const result = await db.query(sql, [account_id, inv_id])
    return result.rows[0]
  } catch (err) {
    console.error("removeFavorite error:", err)
    return null
  }
}

// Get all favorites for a user
async function getUserFavorites(account_id) {
  try {
    const sql = `
      SELECT f.favorite_id, i.*
      FROM favorites f
      JOIN inventory i ON f.inv_id = i.inv_id
      WHERE f.account_id = $1
      ORDER BY f.created_at DESC
    `;
    const data = await db.query(sql, [account_id])
    return data.rows
  } catch (err) {
    console.error("getUserFavorites error:", err)
    return []
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites
}
