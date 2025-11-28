// utilities/validation.js

const { body, validationResult } = require("express-validator")
const utilities = require(".")
const buildClassificationList = require("./classificationList")

module.exports = {
  classificationRules() {
    return [
      body("classification_name")
        .trim()
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage("Classification name must contain only letters and numbers (no spaces).")
    ]
  },

  checkClassificationData: async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: errors.array(),
        messages: req.flash("notice")
      })
      return
    }
    next()
  },

  inventoryRules() {
    return [
      body("inv_make").trim().notEmpty().withMessage("Make is required."),
      body("inv_model").trim().notEmpty().withMessage("Model is required."),
      body("inv_year").isInt().withMessage("Year must be a number."),
      body("inv_price").isFloat().withMessage("Price must be numeric."),
      body("inv_miles").isInt().withMessage("Miles must be a number."),
      body("classification_id").isInt().withMessage("Classification is required.")
    ]
  },

  checkInventoryData: async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const nav = await utilities.getNav()
      const classificationList = await utilities.buildClassificationList(req.body.classification_id)

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
}
