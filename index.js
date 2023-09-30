const compression = require('compression')
const express = require('express');
const hbs = require('express-handlebars');
const fp = require('path');
const fs = require('fs').promises;

function relative(path) {
    return fp.join(__dirname, path);
}

async function readFile(path) {
    try {
        const data = await fs.readFile(path);
        return data.toString();
      } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
      }
}

const app = express();
//handlebars
app.engine('hbs', hbs.engine({
    partialsDir: relative('views/partials'),
    layoutsDir:    relative('/views/layouts'),
    defaultLayout: relative('/views/layouts'+'/main.hbs'),
    extname: 'hbs',
    helpers: {
        section: function(name, options) { 
            if (!this._sections) this._sections = {};
              this._sections[name] = options.fn(this); 
              return null;
        },
        yield: function (name, default_value) {
            if(typeof default_value == "object") default_value = "";
            if (!this._sections) this._sections = {};
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
    const wordPromise = readFile(relative('html/partials/etymology-word.html'));
    const summaryPromise = readFile(relative('html/partials/etymology-summary.html'));
    const sloganPromise = readFile(relative('html/partials/etymology-slogan.html'));



    Promise.all([wordPromise ,summaryPromise,sloganPromise])
    .then( pages => {
        res.render('etymology',{
            word : pages[0],
            summary : pages[1],
            slogan: pages[2]
        });
    });
});

//for serving
const port = 8009;
app.listen(port, () => console.log(`App listening to port ${port}`));