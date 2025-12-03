// controllers/invController.js

const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

// ===============================
// MANAGEMENT DASHBOARD
// ===============================

async function buildManagement(req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    messages: req.flash("notice")
  })
}

// ===============================
// CLASSIFICATION
// ===============================

async function buildAddClassification(req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
    messages: req.flash("notice")
  })
}

async function addClassification(req, res) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)
  const nav = await utilities.getNav()

  if (result) {
    req.flash("notice", "Classification added successfully.")
    return res.redirect("/inventory")
  }

  req.flash("notice", "Failed to add classification.")
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
    messages: req.flash("notice")
  })
}

// ===============================
// ADD INVENTORY
// ===============================

async function buildAddInventory(req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add Inventory Item",
    nav,
    classificationList,
    errors: null,
    messages: req.flash("notice"),
    ...req.body
  })
}

async function addInventory(req, res) {
  const result = await invModel.addInventory(req.body)

  if (result) {
    req.flash("notice", "Vehicle added successfully.")
    return res.redirect("/inventory")
  }

  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(req.body.classification_id)

  req.flash("notice", "Error adding vehicle.")
  res.render("inventory/add-inventory", {
    title: "Add Inventory Item",
    nav,
    classificationList,
    errors: null,
    messages: req.flash("notice"),
    ...req.body
  })
}

// ===============================
// EDIT INVENTORY
// ===============================

async function buildEditInventory(req, res) {
  const inv_id = req.params.inv_id
  const item = await invModel.getInventoryById(inv_id)

  if (!item) {
    req.flash("notice", "Inventory item not found.")
    return res.redirect("/inventory")
  }

  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(item.classification_id)

  res.render("inventory/edit-inventory", {
    title: `Edit ${item.inv_make} ${item.inv_model}`,
    nav,
    classificationList,
    item
  })
}

async function updateInventory(req, res) {
  const inv_id = req.body.inv_id
  const result = await invModel.updateInventory(req.body, inv_id)

  if (result) {
    req.flash("notice", "Inventory updated successfully.")
    return res.redirect("/inventory")
  }

  req.flash("notice", "Error updating inventory.")
  res.redirect(`/inventory/edit/${inv_id}`)
}

// ===============================
// DELETE INVENTORY
// ===============================

async function buildDeleteConfirmation(req, res) {
  const item = await invModel.getInventoryById(req.params.inv_id)

  if (!item) {
    req.flash("notice", "Item not found.")
    return res.redirect("/inventory")
  }

  const nav = await utilities.getNav()

  res.render("inventory/delete-inventory", {
    title: "Delete Vehicle",
    nav,
    item
  })
}

async function deleteInventory(req, res) {
  const { inv_id } = req.body
  const result = await invModel.deleteInventory(inv_id)

  if (result) {
    req.flash("notice", "Vehicle deleted successfully.")
    return res.redirect("/inventory")
  }

  req.flash("notice", "Error deleting vehicle.")
  return res.redirect("/inventory")
}

// ===============================
// EXPORT CONTROLLER
// ===============================

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory,
  buildEditInventory,
  updateInventory,
  buildDeleteConfirmation,
  deleteInventory
}
