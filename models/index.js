"use strict";

var fs        = require("fs");
var path      = require("path");
var mongoose  = require("mongoose");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var mongoUrl  = config.mongo_url;
if(process.env.MONGO_URL != undefined) {
  mongoUrl = process.env.MONGO_URL;
}

mongoose.connect(config.mongo_url);

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var modelDefinition = require(path.join(__dirname, file));
    var model = mongoose.model(modelDefinition.name, modelDefinition.schema);
    db[modelDefinition.name] = model;
  });



  //===========================================

// //Database configuration with mongoose
// mongoose.connect('mongodb://localhost/week18day3mongoose');
// var db = mongoose.connection;

// // show any mongoose errors
// db.on('error', function(err) {
//   console.log('Mongoose Error: ', err);
// });

// // once logged in to the db through mongoose, log a success message
// db.once('open', function() {
//   console.log('Mongoose connection successful.');
// });


module.exports = db;
