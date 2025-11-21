// app.js (partial)
const express = require('express');
const app = express();
const inventoryRouter = require('./routes/inventory');
const errorController = require('./controllers/baseController'); // from your activities

// ... other middleware and routes
app.use('/inventory', inventoryRouter);

// 404 handler for unknown routes
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handling middleware (must have 4 args)
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status);
  // Render a friendly error view (views/error.ejs)
  res.render('error', {
    message: err.message || 'Server Error',
    status,
    stack: (app.get('env') === 'development') ? err.stack : ''
  });
});

module.exports = app;
