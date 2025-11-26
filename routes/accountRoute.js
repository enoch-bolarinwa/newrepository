// Required modules at top
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");   // <-- Number 1


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


// -----------------------------------------
// ✅ NUMBER 2 GOES RIGHT HERE
// -----------------------------------------

// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),      // validation rules
  regValidate.checkRegistrationData,    // run validation & handle errors
  utilities.handleErrors(accountController.registerAccount)
)


// -----------------------------------------
// End of routes
// -----------------------------------------

module.exports = router
