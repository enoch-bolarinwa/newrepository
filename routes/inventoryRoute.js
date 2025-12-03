// routes/inventoryRoute.js

const express = require("express")
const router = express.Router()

const invController = require("../controllers/invController")
const utilities = require("../utilities")
const validate = require("../utilities/validation")

const { checkJWT } = require("../utilities/accountAuth")
const { checkEmployee } = require("../utilities/checkEmployee")

// ===============================
//  INVENTORY MANAGEMENT DASHBOARD
// ===============================
router.get(
  "/",
  checkJWT,
  checkEmployee,
  utilities.handleErrors(invController.buildManagement)
)

// ===============================
//  CLASSIFICATION ROUTES
// ===============================
router.get(
  "/add-classification",
  checkJWT,
  checkEmployee,
  utilities.handleErrors(invController.buildAddClassification)
)

router.post(
  "/add-classification",
  checkJWT,
  checkEmployee,
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// ===============================
//  INVENTORY ITEM ROUTES
// ===============================
router.get(
  "/add-inventory",
  checkJWT,
  checkEmployee,
  utilities.handleErrors(invController.buildAddInventory)
)

router.post(
  "/add-inventory",
  checkJWT,
  checkEmployee,
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// ===============================
//  EDIT INVENTORY ITEM
// ===============================
router.get(
  "/edit/:inv_id",
  checkJWT,
  checkEmployee,
  utilities.handleErrors(invController.buildEditInventory)
)

router.post(
  "/update",
  checkJWT,
  checkEmployee,
  utilities.handleErrors(invController.updateInventory)
)

// ===============================
//  DELETE INVENTORY ITEM
// ===============================
router.get(
  "/delete/:inv_id",
  checkJWT,
  checkEmployee,
  utilities.handleErrors(invController.buildDeleteConfirmation)
)

router.post(
  "/delete",
  checkJWT,
  checkEmployee,
  utilities.handleErrors(invController.deleteInventory)
)

module.exports = router
