// utilities/validation.js

const { body, validationResult } = require("express-validator")
const utilities = require(".")

module.exports = {

  classificationRules() {
    return [
      body("classification_name")
        .trim()
        .isLength({ min: 1 })
        .withMessage("Classification name is required.")
        .matches(/^[A-Za-z0-9]+$/)
        .withMessage("No spaces or special characters allowed.")
    ]
  },

  checkClassificationData(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const nav = utilities.getNav()
      return res.render("inventory/add-classification", {
        title: "Add Classification",
        nav,
        errors: errors.array(),
        messages: req.flash("notice")
      })
    }
    next()
  },

  // Inventory Rules
  inventoryRules() {
    return [
      body("inv_make").trim().notEmpty(),
      body("inv_model").trim().notEmpty(),
      body("inv_year").isInt(),
      body("inv_price").isFloat(),
      body("inv_miles").isInt(),
      body("classification_id").isInt()
    ]
  },

  checkInventoryData: async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const nav = await utilities.getNav()
      const classificationList =
        await utilities.buildClassificationList(req.body.classification_id)

      return res.render("inventory/add-inventory", {
        title: "Add New Inventory Item",
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
