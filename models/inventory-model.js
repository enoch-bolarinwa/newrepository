// models/inventory-model.js

const pool = require("../database/")

/* ============================
   Add Classification
=============================== */
async function addClassification(name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *
    `
    const result = await pool.query(sql, [name])
    return result.rows[0]
  } catch (error) {
    return null
  }
}

/* ============================
   Add Inventory Item
=============================== */
async function addInventory({
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
}) {
  try {
    const sql = `
      INSERT INTO inventory 
        (inv_make, inv_model, inv_year, inv_description,
         inv_image, inv_thumbnail, inv_price, inv_miles,
         inv_color, classification_id)
      VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `

    const data = [
      inv_make, inv_model, inv_year, inv_description,
      inv_image, inv_thumbnail, inv_price, inv_miles,
      inv_color, classification_id
    ]

    const result = await pool.query(sql, data)
    return result.rows[0]
  } catch (error) {
    return null
  }
}

module.exports = {
  addClassification,
  addInventory
}
