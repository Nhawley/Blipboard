var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));

//Database configuration
mongoose.connect('mongodb://heroku_gl22lrn3:8q7tauds0s7pk1bg8gk2oaage6@ds021343.mlab.com:21343/heroku_gl22lrn3');
var db = mongoose.connection;

db.on('error', function (err) {
console.log('Mongoose Error: ', err);
});
db.once('open', function () {
console.log('Mongoose connection successful.');
});

//Require Schemas
var Gearz = require('./app/models/Gearz.js');
var Blip = require('./app/models/Blip.js');

// HTML Routes (index)
app.get('/', function(req, res) {
  res.send(index.html);
});

// API Routes (Lanes)
require('./app/routes/Lanes.js')(app);


app.listen(5000, function() {
  console.log('App running on port 5000!');
});