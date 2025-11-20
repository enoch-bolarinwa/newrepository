const express = require("express")
const router = express.Router()
const baseController = require("../controllers/baseController")

// Home page
router.get("/", baseController.buildHome)

// Test error route
router.get("/cause-error", baseController.triggerError)

router.get("/trigger-error", (req, res, next) => {
  const err = new Error("Intentional 500 error for testing")
  err.status = 500
  next(err)
})


module.exports = router
