// controllers/invController.js

const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

async function buildManagement(req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    messages: req.flash("notice")
  })
}

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
    return res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash("notice")
    })
  }

  req.flash("notice", "Failed to add classification.")
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
    messages: req.flash("notice")
  })
}

async function buildAddInventory(req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()

  res.render("inventory/add-inventory", {
    title: "Add New Inventory Item",
    nav,
    classificationList,
    errors: null,
    messages: req.flash("notice"),
    ...req.body
  })
}

async function addInventory(req, res) {
  const result = await invModel.addInventory(req.body)
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(req.body.classification_id)

  if (result) {
    req.flash("notice", "Vehicle added successfully.")
    return res.render("inventory/management", {
      title: "Inventory Management",
      nav,
      messages: req.flash("notice")
    })
  }

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

module.exports = {
  buildManagement,
  buildAddClassification,
  addClassification,
  buildAddInventory,
  addInventory
}
