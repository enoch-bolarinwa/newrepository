const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventory") // 


app.use(async (req, res, next) => {
  const utilities = require("./utilities/")
  res.locals.nav = await utilities.getNav()
  next()
})

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout'); 

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Inventory routes
app.use("/inventory", inventoryRoute);

const PORT = 5500;

// ----------------------
// 1. Imports
// ----------------------
const express = require("express");
const app = express();

const invRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/accountRoute");
const baseRoutes = require("./routes/baseRoute");

// Your navigation utility makes nav available to views
const utilities = require("./utilities");

// ----------------------
// 2. Middleware Setup (body parsing, public folder, etc.)
// ----------------------

// Example:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ----------------------
// 3. Routes
// ----------------------
app.use("/", baseRoutes);
app.use("/inv", invRoute);
app.use("/account", accountRoute);

// If you have more routes, they all go BEFORE the error handler.
// app.use("/someRoute", someRoute);

// ----------------------
// 4. ERROR HANDLING MIDDLEWARE (Task 2)
//    MUST come after all routes
// ----------------------
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const status = err.status || 500;
  const message = err.message || "Server Error Occurred";

  res.status(status).render("errors/error", {
    title: `${status} Error`,
    message,
    nav: res.locals.nav, // assuming nav middleware runs earlier
  });
});

// ----------------------
// 5. START SERVER
// ----------------------
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
