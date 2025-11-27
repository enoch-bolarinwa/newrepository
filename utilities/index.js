// utilities/index.js

const invModel = require("../models/inventory-model")
const navModel = require("./nav")

const utilities = {}

/* Navigation builder */
utilities.getNav = navModel.buildNav

/* Error Handler Wrapper */
utilities.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

/* Classification Select List */
utilities.buildClassificationList = require("./classificationList")

module.exports = utilities
