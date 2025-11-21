// controllers/baseController.js
function triggerError(req, res, next) {
  // example controller to throw an error (if you want)
  next(new Error('Example error triggered via controller'));
}

module.exports = { triggerError };
