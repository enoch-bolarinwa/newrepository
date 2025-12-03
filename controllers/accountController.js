/***********************************************
 * Account Controller
 ***********************************************/
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const accountModel = require("../models/account-model");
const utilities = require("../utilities");
const invController = require("../controllers/inventoryController");


/* ****************************************
 * Deliver Registration View
 **************************************** */
async function buildRegister(req, res) {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
    account_firstname: null,
    account_lastname: null,
    account_email: null
  });
}

/* ****************************************
 * Deliver Login View
 **************************************** */
async function buildLogin(req, res) {
  let nav = await utilities.getNav();
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null
  });
}

/* ****************************************
 * Process Login — Create JWT + Set Cookie
 **************************************** */
async function accountLogin(req, res) {
  const { email, password } = req.body;

  // 1. Get user from DB
  const account = await accountModel.getAccountByEmail(email);
  if (!account) {
    req.flash("notice", "Please check your login credentials.");
    return res.status(400).render("account/login");
  }

  // 2. Verify password
  const match = await bcrypt.compare(password, account.password);
  if (!match) {
    req.flash("notice", "Incorrect password.");
    return res.status(400).render("account/login");
  }

  // 3. Create JWT
  const token = jwt.sign(
    {
      account_id: account.account_id,
      firstname: account.firstname,
      account_type: account.account_type,
      email: account.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 4. Store token in cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
  });

  // 5. Redirect
  req.flash("success", "You are now logged in.");
  return res.redirect("/account/management");
}

/* ****************************************
 * Deliver Account Management View
 **************************************** */
async function buildManagement(req, res) {
  let nav = await utilities.getNav();

  res.render("account/account-management", {
    title: "Account Management",
    nav,
    accountData: res.locals.accountData
  });
}

/* ================================
   DELIVER UPDATE ACCOUNT VIEW
================================ */
async function buildUpdateView(req, res) {
  try {
    const account_id = req.params.account_id;

    const accountData = await accountModel.getAccountById(account_id);

    return res.render("account/update-account", {
      title: "Update Account",
      accountData,
      data: accountData, 
      errors: null,
      messages: res.locals.messages
    });
  } catch (error) {
    console.error("Error loading update view:", error);
    req.flash("error", "Unable to load update form.");
    return res.redirect("/account/");
  }
}

/* =========================================
   PROCESS ACCOUNT INFO UPDATE
========================================= */
async function updateAccountInfo(req, res) {
  const { firstname, lastname, email, account_id } = req.body;

  const updatedData = { firstname, lastname, email, account_id };

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("account/update-account", {
        title: "Update Account",
        accountData: updatedData,
        data: updatedData,
        errors: errors.array(),
        messages: null
      });
    }

    const updateResult = await accountModel.updateAccountInfo(
      firstname,
      lastname,
      email,
      account_id
    );

    if (updateResult) {
      req.flash("success", "Account information updated successfully.");
      const accountData = await accountModel.getAccountById(account_id);

      return res.render("account/account-management", {
        title: "Account Management",
        accountData,
        messages: res.locals.messages,
        errors: null
      });
    }

    req.flash("error", "Update failed.");
    return res.redirect(`/account/update/${account_id}`);

  } catch (error) {
    console.error("Update Info Error:", error);
    req.flash("error", "An error occurred.");
    return res.redirect(`/account/update/${account_id}`);
  }
}

/* =========================================
   PROCESS PASSWORD CHANGE
========================================= */
async function updatePassword(req, res) {
  const { password, account_id } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("account/update-account", {
        title: "Update Account",
        accountData: { account_id },
        data: {},
        errors: errors.array(),
        messages: null
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await accountModel.updatePassword(hashedPassword, account_id);

    if (result) {
      req.flash("success", "Password updated successfully.");
      const accountData = await accountModel.getAccountById(account_id);

      return res.render("account/account-management", {
        title: "Account Management",
        accountData,
        messages: res.locals.messages,
        errors: null
      });
    }

    req.flash("error", "Password update failed.");
    return res.redirect(`/account/update/${account_id}`);

  } catch (error) {
    console.error("Password Update Error:", error);
    req.flash("error", "An error occurred.");
    return res.redirect(`/account/update/${account_id}`);
  }
}

/* ****************************************
 * LOGOUT — Remove JWT Cookie
 **************************************** */
async function logout(req, res) {
  res.clearCookie("jwt");
  req.flash("success", "You have been logged out.");
  return res.redirect("/");
}

/* ****************************************
 * Exports
 **************************************** */
// controllers/inventoryController.js
async function management(req, res) {
  // fetch inventory and render view
  res.render("inventory/management", {
    title: "Inventory Management",
    inventory: [] // example
  });
}

module.exports = {
    management,
  addItem,
  deleteItem,
  buildRegister,
  buildLogin,
  accountLogin,
  buildManagement,
  buildUpdateView,
  updateAccountInfo,
  updatePassword,
  logout
  
};
