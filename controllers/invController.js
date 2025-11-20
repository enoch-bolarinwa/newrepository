// controllers/invController.js
const inventoryModel = require("../models/inventory-model")
const utilities = require("../utilities")

exports.buildDetailView = async (req, res, next) => {
  try {
    const inv_id = req.params.inv_id
    const vehicleData = await inventoryModel.getVehicleById(inv_id)
    if (!vehicleData) {
      const err = new Error("Vehicle not found")
      err.status = 404
      return next(err)
    }

    const vehicleHTML = utilities.formatVehicleHTML(vehicleData)
    res.render("inventory/detail", {
      title: `${vehicleData.make} ${vehicleData.model}`,
      vehicleHTML,
    })
  } catch (err) {
    next(err)
  }
}
