const express = require("express")
const router = express.Router()

const invController = require("../controllers/invController")
const utilities = require("../utilities")
const validate = require("../utilities/validation")

router.get("/", utilities.handleErrors(invController.buildManagement))

router.get("/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

router.post("/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

router.get("/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

router.post("/add-inventory",
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router
