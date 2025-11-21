// controllers/invController.js
const inventoryModel = require('../models/inventory-model');
const utilities = require('../utilities');

// show detail view
async function buildDetailView(req, res, next) {
  const inv_id = req.params.inv_id;

  try {
    // get vehicle by id from model
    const vehicle = await inventoryModel.getVehicleById(inv_id);
    if (!vehicle) {
      // 404 - not found
      const err = new Error('Vehicle not found');
      err.status = 404;
      return next(err);
    }

    // get HTML fragment from utility (wraps data in HTML)
    const vehicleHtml = utilities.buildVehicleDetailHTML(vehicle);

    // render the EJS view, pass both raw data and html fragment
    res.render('inventory/detail', {
      title: `${vehicle.make} ${vehicle.model} - ${vehicle.year}`,
      vehicle,
      vehicleHtml
    });
  } catch (error) {
    // forward any DB or unexpected errors to error handler
    next(error);
  }
}

// intentional error endpoint — will create a 500
function triggerError(req, res, next) {
  try {
    // create an error intentionally
    throw new Error('Intentional server error for testing (Task 3).');
  } catch (err) {
    next(err); // will be caught by our error middleware
  }
}

module.exports = {
  buildDetailView,
  triggerError,
};
