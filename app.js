//Main application

//Declarations
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// add mongoose query and promise support to express
require('express-mongoose');

var models = require('./models');
var routes = require('./routes');
//var middleware = require('./middleware');

//Set up connection to Mongodb
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/crudite', function (err) {
  if (err) {
    throw err;
    console.log("Connection error: ", err);
  }

  var app = express();
  app.use(bodyParser.json());  //support JSON format for body parsing in post data
  app.use(bodyParser.urlencoded({extended: true}));
  //middleware(app);
  routes(app);
  app.use(express.static(path.join(__dirname, 'public')));

//Listen on port 3000 for browser requests
  app.listen(3000, function () {
    console.log('Now listening on http://localhost:3000');
  })
})
