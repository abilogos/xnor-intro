const compression = require('compression')
const express = require('express');
const hbs = require('express-handlebars');
var fp = require('path');

function relative(path) {
    return fp.join(__dirname, path);
}

const app = express();
//handlebars
app.engine('hbs', hbs.engine({
    partialsDir: relative('views/partials'),//__dirname + '/views/partials',
    layoutsDir:    relative('/views/layouts'),
    defaultLayout: relative('/views/layouts'+'/main.hbs'),
    extname: 'hbs',
    helpers: {
        section: function(name, options) { 
            if (!this._sections) this._sections = {};
              this._sections[name] = options.fn(this); 
              console.log(this._sections);
              return null;
        },
        yield: function (name, default_value) {
            if(typeof default_value == "object") default_value = "";
            return this._sections[name] || default_value;
        }
    }
}));
app.set('view engine', 'hbs');
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
app.get('/etymology', (req, res) => {
    res.render('etymology');
});

//for serving
const port = 8009;
app.listen(port, () => console.log(`App listening to port ${port}`));