const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3000;

require('./app/helpers');
require('./seeder');

const ViewUtils = require('./viewUtils');
const routes = require('./app/routes');

// static files
const publicDirectory = path.join(__dirname, './public');
const partialsDirectory = path.join(__dirname, './partials');
hbs.registerPartials(partialsDirectory);

const app = express();
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({ extended: false }));

// session
app.use(session({
  secret: 'secreto tdea',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: require('./app/models/connection') }),
}));

// install boostrap
ViewUtils.setupBaseUI(app);

app.set('view engine', 'hbs');

// routes
app.use('/', routes);
app.use((err, req, res, next) => {
  res.render('error', {
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Escuchando por el puerto ${port}`);
});
