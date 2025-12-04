// app.js

const express = require("express")
const app = express()
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
const inventoryRoute = require("./routes/inventoryRoute")
const favoritesRoute = require("./routes/favoritesRoute")



require("dotenv").config()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Views
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Public folder
app.use(express.static("public"))

// Sessions / Flash
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true
  })
)
app.use(flash())

// Routes
app.use("/inv", inventoryRoute)

// Home route
app.get("/", (req, res) => {
  res.redirect("/inv")
})

app.use("/favorites", favoritesRoute)

// 404
app.use((req, res) => {
  res.status(404).send("Page Not Found")
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send("Server Error")
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Server running on port " + port))
