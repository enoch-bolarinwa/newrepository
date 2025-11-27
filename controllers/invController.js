// controllers/invController.js

const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

/* ============================
   Build Management View
=============================== */
async function buildManagement(req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    messages: req.flash("notice")
  })
}

/* ============================
   Build Add Classification View
=============================== */
async function buildAddClassification(req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add New Classification",
    nav,
    errors: null,
    messages: req.flash("notice")
  })
}

/* ============================
   Process New Classification
=============================== */
async function addClassification(req, res) {
  const { classification_name } = req.body

  const result = await invModel.addClassification(classification_name)
  const nav = await utilities.getNav()

  if (result) {
    req.flash("notice", "Classification added successfully.")
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash("notice")
    })
  } else {
    req.flash("notice", "Failed to add classification.")
    res.status(500).render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: null,
      messages: req.flash("notice")
    })
  }
}

/* ============================
   Build Add Inventory View
=============================== */
async function buildAddInventory(req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add New Inventory Item",
    nav,
    classificationList,
    messages: req.flash("notice"),
    errors: null,
    ...req.body
  })
}

/* ============================
   Process New Inventory Item
=============================== */
async function addInventory(req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(req.body.classification_id)

  const result = await invModel.addInventory(req.body)

  if (result) {
    req.flash("notice", "Vehicle added successfully.")
    res.status(201).render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash("notice")
    })
  } else {
    req.flash("notice", "Failed to add inventory item.")
    res.status(500).render("inventory/add-inventory", {
      title: "Add New Inventory Item",
      nav,
      classificationList,
      messages: req.flash("notice"),
      errors: null,
      ...req.body
    })
  }
}

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory
}
