var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session');
//================================
// Notice: Our scraping tools are prepared, too
var request = require('request'); 
var cheerio = require('cheerio');
var mongoose = require('mongoose');

// instantiate our app
var app = express();

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: null }}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use("/", require("./controllers/application_controller"));
app.use("/user", require("./controllers/user_controller"));
app.use("/article", require("./controllers/article_controller"));

//===============================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


// our module get's exported as app.
module.exports = app;
