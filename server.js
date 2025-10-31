// Import dependencies
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Initialize the app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Tell Express where the views folder is located
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);

// Tell Express where to find static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', function (req, res) {
  res.render('index', { title: 'Home' });
});

// Start the server
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}/`);
});
