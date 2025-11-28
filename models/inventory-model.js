// models/inventory-model.js

const pool = require("../database")

async function addClassification(name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *
    `
    const data = await pool.query(sql, [name])
    return data.rows[0]
  } catch {
    return null
  }
}

async function getClassifications() {
  return pool.query("SELECT * FROM classification ORDER BY classification_name")
}

async function addInventory(vehicle) {
  try {
    const sql = `
      INSERT INTO inventory 
      (inv_make, inv_model, inv_year, inv_description, 
       inv_image, inv_thumbnail, inv_price, inv_miles, 
       inv_color, classification_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
    `

    const params = [
      vehicle.inv_make,
      vehicle.inv_model,
      vehicle.inv_year,
      vehicle.inv_description,
      vehicle.inv_image,
      vehicle.inv_thumbnail,
      vehicle.inv_price,
      vehicle.inv_miles,
      vehicle.inv_color,
      vehicle.classification_id
    ]

    const data = await pool.query(sql, params)
    return data.rows[0]
  } catch {
    return null
  }
}

module.exports = {
  addClassification,
  getClassifications,
  addInventory
}
