const utilities = require("../utilities/")

/**
 * Base Controller
 */
const baseController = {}

// Render the home page
baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("index", { title: "Home", nav })
}

// Trigger an intentional error for testing
baseController.triggerError = (req, res, next) => {
  next(new Error("Intentional 500 error for testing."))
}

module.exports = baseController
