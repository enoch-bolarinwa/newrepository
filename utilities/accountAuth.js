function checkJWT(req, res, next) {
  try {
    // verify token here...
    return next()
  } catch (err) {
    return res.status(401).send("Invalid token")
  }
}

module.exports = { checkJWT }
