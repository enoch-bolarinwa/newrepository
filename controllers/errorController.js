// controllers/errorController.js

const errorController = {}

/* ************************************
 * Trigger an intentional error for testing
 * ************************************ */
errorController.triggerError = (req, res, next) => {
  // You can throw OR pass to next()
  const err = new Error("Intentional error triggered for testing")
  err.status = 500
  next(err)
}

// controllers/errorController.js

const errorController = {}

/* ************************************
 * Trigger an intentional error for testing
 * ************************************ */
errorController.triggerError = (req, res, next) => {
  const err = new Error("Intentional error triggered for testing")
  err.status = 500
  next(err)
}

/* ************************************
 * Example placeholder for other error-related controllers
 * ************************************ */
errorController.buildHome = async (req, res, next) => {
  res.send("Error controller home")
}

module.exports = errorController

module.exports = errorController
