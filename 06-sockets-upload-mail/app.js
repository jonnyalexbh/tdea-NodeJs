
const express = require('express');

const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

const routes = require('./app/routes');

// requires
require('./app/config/config');

// static files
const publicDirectory = path.join(__dirname, 'public');
const nodeModulesDir = path.join(__dirname, 'node_modules');
const partialsDirectory = path.join(__dirname, 'partials');

app.use(express.static(publicDirectory));
hbs.registerPartials(partialsDirectory);
app.use(bodyParser.urlencoded({ extended: false }));

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// middleware
app.use((req, res, next) => {
  if (req.session.name) {
    res.locals.sesion = true;
    res.locals.name = req.session.name;
  }
  next();
});

// routes
app.use(routes);

// mongose
mongoose.connect('mongodb://localhost:27017/tdea-jabh', { useNewUrlParser: true }, (error) => {
  if (error) {
    return console.log(error);
  }
  return console.log('connected');
});

// install boostrap
app.use('/css', express.static(path.join(nodeModulesDir, '/bootstrap/dist/css')));
app.use('/js', express.static(path.join(nodeModulesDir, '/jquery/dist')));
app.use('/js', express.static(path.join(nodeModulesDir, '/popper.js/dist')));
app.use('/js', express.static(path.join(nodeModulesDir, '/bootstrap/dist/js')));

app.set('view engine', 'hbs');

app.listen(process.env.PORT, () => {
  console.log(`Escuchando por el puerto ${process.env.PORT}`);
});
