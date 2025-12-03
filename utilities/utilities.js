// utilities.js

// Dummy navigation helper
async function getNav() {
  return [
    { name: "Home", link: "/" },
    { name: "Inventory Management", link: "/inventory" },
    { name: "Add Vehicle", link: "/inventory/add-inventory" },
    { name: "Add Classification", link: "/inventory/add-classification" }
  ]
}

// Build classification dropdown options
async function buildClassificationList(selectedId) {
  const invModel = require("./models/inventory-model")
  const classifications = await invModel.getClassifications()
  return classifications.map(c => ({
    id: c.classification_id,
    name: c.classification_name,
    selected: selectedId == c.classification_id
  }))
}

// Simple error handler wrapper
function handleErrors(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next)
  }
}

module.exports = {
  getNav,
  buildClassificationList,
  handleErrors
}
