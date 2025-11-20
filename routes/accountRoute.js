const express = require("express")
const router = express.Router()

// Example: Account home page
router.get("/", (req, res) => {
  res.send("Welcome to the Account Home Page")
})

// Example: Account profile page
router.get("/profile", (req, res) => {
  res.send("This is the Account Profile Page")
})

// Example: Account settings page
router.get("/settings", (req, res) => {
  res.send("This is the Account Settings Page")
})

module.exports = router
