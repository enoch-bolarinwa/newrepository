import express from 'express';
import expressLayouts from 'express-ejs-layouts';

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout'); 

app.use(expressLayouts);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

const PORT = 5500;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
