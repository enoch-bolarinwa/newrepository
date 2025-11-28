const express = require("express")
const session = require("express-session")
const flash = require("connect-flash")
const path = require("path")
require("dotenv").config()

const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Views
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Public
app.use(express.static("public"))

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true
  })
)

app.use(flash())

// Routes
const inventoryRoute = require("./routes/inventoryRoute")
app.use("/inv", inventoryRoute)

app.get("/", (req, res) => {
  res.redirect("/inv")
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send("Internal Server Error")
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))
