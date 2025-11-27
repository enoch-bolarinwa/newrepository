const express = require("express");
const app = express();
const invRoute = require("./routes/inventoryRoute");

// static
app.use(express.static("public"));

// routes
app.use("/inv", invRoute);   // important

// 404 handler (last)
app.use((req, res, next) => {
  next(new Error("Not Found"));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", { error: err });
});

module.exports = app;
