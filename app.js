var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var hbs = require('express-hbs');

var controllers = require('./controllers');


var config = require('./config')

var app = express();

// Global values
app.locals = {
  title: config.application.title,
  version: config.application.version,
  page_name: 'home',
  hide_navbar: false,
  messages: [],
  settings: {}
};

// view engine setup
app.engine('hbs', hbs.express3({
  viewsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts'),
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser(config.session.secret));
app.use(session({ secret: config.session.secret, saveUninitialized: true, resave: true }));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', controllers.root);
app.use('/people', controllers.people);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
