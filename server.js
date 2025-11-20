/********************************
 * 1. Imports
 ********************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const inventoryRoute = require("./routes/inventory")


const invRoute = require("./routes/inventory")

const accountRoute = require("./routes/accountRoute")
const baseRoutes = require("./routes/baseRoute")
const utilities = require("./utilities")

const app = express()
const PORT = 5500

/********************************
 * 2. EJS & LAYOUT SETUP
 ********************************/
app.set("view engine", "ejs")
app.set("views", "./views")
app.set("layout", "layouts/layout")
app.use(expressLayouts)

/********************************
 * 3. GLOBAL NAVIGATION MIDDLEWARE
 ********************************/
app.use(async (req, res, next) => {
  res.locals.nav = await utilities.getNav()
  next()
})

/********************************
 * 4. STANDARD MIDDLEWARE
 ********************************/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

/********************************
 * 5. ROUTES
 ********************************/
app.use("/", baseRoutes)
app.use("/inventory", inventoryRoute)
app.use("/account", accountRoute)

/********************************
 * 6. ERROR HANDLING MIDDLEWARE
 ********************************/
app.use((err, req, res, next) => {
  console.error("Error:", err)

  const status = err.status || 500
  const message = err.message || "Server Error Occurred"

  res.status(status).render("errors/error", {
    title: `${status} Error`,
    message,
    nav: res.locals.nav,
  })
})

// Catch all 404 errors
app.use((req, res, next) => {
  const err = new Error("Page Not Found")
  err.status = 404
  next(err)
})

// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).render("errors/error", {
    title: `Error ${status}`,
    message: err.message,
  })
})


/********************************
 * 7. START SERVER
 ********************************/
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
)
