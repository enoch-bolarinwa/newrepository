const favoritesModel = require("../models/favorites-model")
const utilities = require("../utilities")

async function buildFavorites(req, res) {
  const nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id
  const favorites = await favoritesModel.getUserFavorites(account_id)

  return res.render("account/favorites", {
    title: "My Saved Vehicles",
    nav,
    favorites,
    messages: req.flash("notice")
  })
}

async function addFavorite(req, res) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  const result = await favoritesModel.addFavorite(account_id, inv_id)

  if (result) {
    req.flash("notice", "Vehicle saved to favorites.")
  } else {
    req.flash("notice", "Vehicle already in favorites.")
  }

  res.redirect("/inventory/detail/" + inv_id)
}

async function removeFavorite(req, res) {
  const { inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  await favoritesModel.removeFavorite(account_id, inv_id)

  req.flash("notice", "Vehicle removed from favorites.")
  res.redirect("/favorites")
}

module.exports = {
  buildFavorites,
  addFavorite,
  removeFavorite
}
