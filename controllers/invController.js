invCont.buildDetailView = async function (req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id);
    const data = await invModel.getVehicleById(inv_id);

    if (!data) {
      next({ status: 404, message: "Vehicle not found" });
      return;
    }

    const html = utilities.buildVehicleDetailHTML(data);

    res.render("inventory/detail", {
      title: `${data.inv_make} ${data.inv_model}`,
      nav: await utilities.getNav(),
      vehicleHTML: html,
    });
  } catch (error) {
    next(error);
  }
};

const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}
module.exports = invCont