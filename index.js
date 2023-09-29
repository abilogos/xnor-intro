const compression = require('compression')
const express = require('express');
const hbs = require('express-handlebars');

const app = express();
//handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'main'
}));
app.use(express.static('public'));
app.set('views', __dirname + '/views/pages');

if (process.env.NODE_ENV == 'production') {
    app.use(compression());
    app.enable('view cache');
}
//routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/developers', (req, res) => {
    res.render('developers');
});

//for serving
const port = 8009;
app.listen(port, () => console.log(`App listening to port ${port}`));