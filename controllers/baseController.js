const utilities = require("../utilities/")
const baseController = {}

baseController.buildHome = async function(req, res){
  const nav = await utilities.getNav()
  res.render("index", {title: "Home", nav})
}

const errorController = {};

errorController.triggerError = (req, res, next) => {
  throw new Error("Intentional 500 error for testing.");
};

module.exports = errorController;

module.exports = baseController