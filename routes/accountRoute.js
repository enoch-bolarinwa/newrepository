// **********************************************
// Account Routes
// **********************************************
const express = require("express");
const router = new express.Router();

const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");
const accountValidate = require("../utilities/account-validation");
const { checkJWT } = require("../utilities/accountAuth");  // <-- Needed


// =============================================
// Public Views
// =============================================

// Register view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process registration
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegistrationData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process login
router.post(
  "/login",
  utilities.handleErrors(accountController.accountLogin)
);


// =============================================
// Protected Routes (Require Logged-In User)
// =============================================

// Account Management
router.get(
  "/management",
  checkJWT,
  utilities.handleErrors(accountController.buildManagement)
);

// Update account view
router.get(
  "/update/:account_id",
  checkJWT,
  utilities.handleErrors(accountController.buildUpdateView)
);

// Update account info
router.post(
  "/update-info",
  checkJWT,
  accountValidate.updateAccountRules(),
  accountValidate.checkAccountUpdateData,
  utilities.handleErrors(accountController.updateAccountInfo)
);

// Update password
router.post(
  "/update-password",
  checkJWT,
  accountValidate.passwordRules(),
  accountValidate.checkPasswordUpdate,
  utilities.handleErrors(accountController.updatePassword)
);


// =============================================
// Logout
// =============================================
router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  req.flash("success", "You have been logged out.");
  res.redirect("/");
});


// =============================================
// Export router
// =============================================
module.exports = router;
