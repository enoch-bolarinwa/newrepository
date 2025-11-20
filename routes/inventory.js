// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const errorController = require("../controllers/baseController");


// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Display a single vehicle
router.get("/detail/:inv_id", invController.buildDetailView);

router.get("/cause-error", errorController.triggerError);




module.exports = router;

