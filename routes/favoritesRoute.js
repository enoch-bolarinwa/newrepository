const express = require("express")
const router = express.Router()

const favoritesController = require("../controllers/favoritesController")
const utilities = require("../utilities")
const { checkJWT } = require("../utilities/accountAuth")

router.get(
  "/",
  checkJWT,
  utilities.handleErrors(favoritesController.buildFavorites)
)

router.post(
  "/add",
  checkJWT,
  utilities.handleErrors(favoritesController.addFavorite)
)

router.post(
  "/remove",
  checkJWT,
  utilities.handleErrors(favoritesController.removeFavorite)
)

module.exports = router
