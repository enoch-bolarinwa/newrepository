/***********************************************
 * Account Validation
 ***********************************************/
const utilities = require("../utilities");           // FIXED PATH
const { body, validationResult } = require("express-validator");

const validate = {};


/* ============================================
   1. REGISTRATION VALIDATION RULES
============================================ */
validate.registrationRules = () => {
  return [
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a first name."),

    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a last name."),

    body("account_email")
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email address is required."),

    body("account_password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
      .withMessage(
        "Password must be at least 12 characters and include uppercase, lowercase, numbers, and symbols."
      )
  ];
};


/* ============================================
   2. CHECK REGISTRATION ERRORS
============================================ */
validate.checkRegistrationData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();

    return res.render("account/register", {
      title: "Register",
      nav,
      errors: errors.array(),
      account_firstname: req.body.account_firstname,
      account_lastname: req.body.account_lastname,
      account_email: req.body.account_email
    });
  }

  next();
};


/* ============================================
   3. UPDATE ACCOUNT INFO RULES
============================================ */
validate.updateAccountRules = () => {
  return [
    body("firstname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("First name is required."),

    body("lastname")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Last name is required."),

    body("email")
      .trim()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email address is required.")
  ];
};


/* ============================================
   4. CHECK UPDATE ACCOUNT INFO ERRORS
============================================ */
validate.checkAccountUpdateData = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("account/update-account", {
      title: "Update Account",
      errors: errors.array(),
      data: req.body,
      accountData: req.body      // sticky form values
    });
  }

  next();
};


/* ============================================
   5. UPDATE PASSWORD RULES
============================================ */
validate.passwordRules = () => {
  return [
    body("password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
      .withMessage(
        "Password must be at least 12 characters and include uppercase, lowercase, numbers, and symbols."
      )
  ];
};


/* ============================================
   6. CHECK PASSWORD UPDATE ERRORS
============================================ */
validate.checkPasswordUpdate = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("account/update-account", {
      title: "Update Account",
      errors: errors.array(),
      data: {},
      accountData: { account_id: req.body.account_id }
    });
  }

  next();
};


module.exports = validate;
