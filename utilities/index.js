// utilities/index.js

const nav = require("./nav")
const buildClassificationList = require("./classificationList")

const utilities = {}

utilities.getNav = nav.buildNav

utilities.buildClassificationList = buildClassificationList

utilities.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = utilities
