const express = require('express');
const hbs = require('express-handlebars');

const app = express();
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.use(express.static('public'));
app.set('views', __dirname + '/views/pages');

app.get('/', (req, res) => {
    // Integrates the body of "intro.hbs" inside the defaultLayout "main.hbs"
    res.render('home');
});

//for serving
const port = 3000;
app.listen(port, () => console.log(`App listening to port ${port}`));