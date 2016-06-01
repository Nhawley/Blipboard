var cheerio = require('cheerio');
var request = require('request');

//Require Schemas
var Gearz = require('../models/Gearz.js');
var Blip = require('../models/Blip.js');


// Routing 
module.exports = function(app){

	app.get('/scrape', function(req, res) {
	  request('http://blog.caranddriver.com/', function(error, response, html) {
	    var $ = cheerio.load(html);
	    //console.log(html);
	    $('li').each(function(i, element) {

			var result = {};

			result.title = $(this).children('h1').children('a').text();
			result.link = $(this).children('h1').children('a').attr('href');
			result.preview = $(this).children('div.post').children('p').text();

			var entry = new Gearz (result);

			entry.save(function(err, doc) {
			  if (err) {
			    console.log(err);
			  } else {
			    console.log(doc);
			  }
			});
	    });
	  });
	  res.send("Scrape Complete");
	});

	app.get('/gearz', function(req, res){
		Gearz.find({}, function(err, doc){
			if (err){
				console.log(err);
			} else {
				res.json(doc);
			}
		});
	});


	app.get('/gearz/:id', function(req, res){
		Gearz.findOne({'_id': req.params.id})
		.populate('Blip')
		.exec(function(err, doc){
			if (err){
				console.log(err);
			} else {
				res.json(doc);
			}
		});
	});


	app.post('/gearz/:id', function(req, res){
		var newBlip = new Blip(req.body);

		newBlip.save(function(err, doc){
			if(err){
				console.log(err);
			} else {
				Gearz.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
				.exec(function(err, doc){
					if (err){
						console.log(err);
					} else {
						res.send(doc);
					}
				});
			}
		});
	});

}