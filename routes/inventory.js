// routes/inventory.js
const express = require('express');
const router = new express.Router();
const invController = require('../controllers/invController');

// existing classification routes...
// Route to show a single vehicle detail (expects /inventory/detail/:inv_id)
router.get('/detail/:inv_id', invController.buildDetailView);

// Intentional error route for Task 3
router.get('/cause-error', invController.triggerError);

module.exports = router;
