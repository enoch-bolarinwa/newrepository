// routes/inventory.js
const express = require("express")
const router = express.Router()
const invController = require("../controllers/invController")

// Single vehicle detail view
router.get("/detail/:inv_id", invController.buildDetailView)

module.exports = router
