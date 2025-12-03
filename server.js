// server.js
const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")

const inventoryRoutes = require("./routes/inventoryRoute")

const app = express()
const PORT = process.env.PORT || 3000

// -------------------------
// Middleware
// -------------------------

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }))

// Parse JSON bodies
app.use(express.json())

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")))

// Sessions for flash messages
app.use(
  session({
    secret: "supersecretkey", // change this in production
    resave: false,
    saveUninitialized: true
  })
)

// Flash messages
app.use(flash())

// Make flash messages available in all views
app.use((req, res, next) => {
  res.locals.messages = req.flash()
  next()
})

// -------------------------
// View engine
// -------------------------
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs") // or 'pug', 'hbs' depending on your choice

// -------------------------
// Routes
// -------------------------
app.use("/inventory", inventoryRoutes)

// Optional: Root route redirect
app.get("/", (req, res) => {
  res.redirect("/inventory")
})

// -------------------------
// 404 handler
// -------------------------
app.use((req, res) => {
  res.status(404).send("404 - Page not found")
})

// -------------------------
// Error handler
// -------------------------
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong! " + err.message)
})

// -------------------------
// Start server
// -------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
