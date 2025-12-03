// utilities/validation.js

const { body, validationResult } = require("express-validator")
const utilities = require("./index")

// ===============================
// Classification Validation
// ===============================

const classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Classification name must be at least 3 characters.")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Classification name can only contain letters.")
  ]
}

const checkClassificationData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
      messages: req.flash("notice")
    })
  }
  next()
}

// ===============================
// Inventory Validation
// ===============================

const inventoryRules = () => {
  return [
    body("inv_make").trim().isLength({ min: 2 }).withMessage("Make is required."),
    body("inv_model").trim().isLength({ min: 2 }).withMessage("Model is required."),
    body("inv_year")
      .isInt({ min: 1900, max: 2100 })
      .withMessage("Year must be valid."),
    body("inv_price").isFloat({ min: 0 }).withMessage("Price must be a number."),
    body("inv_miles").isInt({ min: 0 }).withMessage("Miles must be a number."),
    body("inv_color").trim().notEmpty().withMessage("Color is required."),
    body("classification_id").isInt().withMessage("Classification is required.")
  ]
}

const checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    const classificationList = await utilities.buildClassificationList(
      req.body.classification_id
    )

    return res.render("inventory/add-inventory", {
      title: "Add Inventory Item",
      nav,
      classificationList,
      errors: errors.array(),
      messages: req.flash("notice"),
      ...req.body
    })
  }

  next()
}

// ===============================
// EXPORT
// ===============================

module.exports = {
  classificationRules,
  checkClassificationData,
  inventoryRules,
  checkInventoryData
}
