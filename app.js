'use strict'

/**
 * Module dependencies.
 */
var express = require('express')
var compress = require('compression');
//var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var path = require('path');
var assets = require('connect-assets');
var sass = require('node-sass');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');

/**
 * Create Express server.
 */
var app = express()

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(assets({
  paths: ['public/css', 'public/js']
}));
app.use(logger('dev'));
//app.use(favicon(path.join(__dirname, 'public/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret
}));
// app.use(lusca({
//   csrf: true,
//   xframe: 'SAMEORIGIN',
//   xssProtection: true
// }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;


