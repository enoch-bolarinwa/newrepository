// models/inventory-model.js

const pool = require("../database")

// ===============================
// CLASSIFICATIONS
// ===============================

async function addClassification(name) {
  try {
    const sql = `
      INSERT INTO classification (classification_name)
      VALUES ($1)
      RETURNING *
    `
    const data = await pool.query(sql, [name])
    return data.rows[0]
  } catch (error) {
    console.error("addClassification error:", error)
    return null
  }
}

async function getClassifications() {
  try {
    const result = await pool.query(
      "SELECT * FROM classification ORDER BY classification_name"
    )
    return result.rows
  } catch (error) {
    console.error("getClassifications error:", error)
    return []
  }
}

// ===============================
// INVENTORY CRUD
// ===============================

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
  } catch (error) {
    console.error("addInventory error:", error)
    return null
  }
}

async function getInventoryById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inv_id = $1"
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("getInventoryById error:", error)
    return null
  }
}

async function updateInventory(data, inv_id) {
  try {
    const sql = `
      UPDATE inventory
      SET
        inv_make = $1,
        inv_model = $2,
        inv_year = $3,
        inv_description = $4,
        inv_image = $5,
        inv_thumbnail = $6,
        inv_price = $7,
        inv_miles = $8,
        inv_color = $9,
        classification_id = $10
      WHERE inv_id = $11
      RETURNING *
    `
    const params = [
      data.inv_make,
      data.inv_model,
      data.inv_year,
      data.inv_description,
      data.inv_image,
      data.inv_thumbnail,
      data.inv_price,
      data.inv_miles,
      data.inv_color,
      data.classification_id,
      inv_id
    ]

    const result = await pool.query(sql, params)
    return result.rows[0]
  } catch (error) {
    console.error("updateInventory error:", error)
    return null
  }
}

async function deleteInventory(inv_id) {
  try {
    const sql = `
      DELETE FROM inventory
      WHERE inv_id = $1
      RETURNING *
    `
    const data = await pool.query(sql, [inv_id])
    return data.rows[0]
  } catch (error) {
    console.error("deleteInventory error:", error)
    return null
  }
}

// =================================
// EXPORT MODEL
// =================================

module.exports = {
  addClassification,
  getClassifications,
  addInventory,
  getInventoryById,
  updateInventory,
  deleteInventory
}
