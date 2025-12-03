function checkEmployee(req, res, next) {
  if (req.account_type === "Employee" || req.account_type === "Admin") {
    return next()
  }
  return res.status(403).send("Access denied")
}

module.exports = { checkEmployee }
