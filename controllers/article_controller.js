var express = require('express');
var router = express.Router();
var request = require('request'); 
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var article = require('../models').article;
var note = require('../models').note;
// var article = require('../models/article.js');


// A GET request to scrape the echojs website.
router.get("/scrape", function(req, res) {
	console.log("yoyo2")
	// first, we grab the body of the html with request
  request('http://www.echojs.com/', function(error, response, html) {
  	// then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // now, we grab every h2 within an article tag, and do the following:
    $('article h2').each(function(i, element) {

    		// save an empty result object
				var result = {};

				// add the text and href of every link, 
				// and save them as properties of the result obj
				result.title = $(this).children('a').text();
				result.link = $(this).children('a').attr('href');

				console.log(result.title)

				// using our Article model, create a new entry.
				// Notice the (result):
				// This effectively passes the result object to the entry (and the title and link)
				var entry = new article (result);

				// now, save that entry to the db
				entry.save(function(err, doc) {
					// log any errors
				  if (err) {
				    console.log(err);
				  } 
				  // or log the doc
				  else {
				    console.log(doc);
				  }
				});

    });
  });
  // tell the browser that we finished scraping the text.
  res.send("Scrape Complete");
});



// this will get the articles we scraped from the mongoDB
router.get('/articles', function(req, res){
	// grab every doc in the Articles array
	article.find({}, function(err, doc){
		// log any errors 	
		if (err){
			console.log(err);
		} 
		// or send the doc to the browser as a json object
		else {
			res.json(doc);
		}
	});
});

// grab an article by it's ObjectId
router.get('/articles/:id', function(req, res){
	// using the id passed in the id parameter, 
	// prepare a query that finds the matching one in our db...
	console.log("1111")
	article.findOne({'_id': req.params.id})
	// and populate all of the notes associated with it.
	.populate('note')
	// now, execute our query
	.exec(function(err, doc){
		// log any errors
		if (err){
			console.log(err);
			console.log("1111")
		} 
		// otherwise, send the doc to the browser as a json object
		else {
			res.json(doc);
			console.log("1111222")
		}
	});
});


// replace the existing note of an article with a new one
// or if no note exists for an article, make the posted note it's note.
router.post('/articles/:id', function(req, res){
	// create a new note and pass the req.body to the entry.
	var newnote = new note(req.body);

	// and save the new note the db
	newnote.save(function(err, doc){
		// log any errors
		if(err){
			console.log(err);
		} 
		// otherwise
		else {
			// using the Article id passed in the id parameter of our url, 
			// prepare a query that finds the matching Article in our db
			// and update it to make it's lone note the one we just saved
			article.findOneAndUpdate({'_id': req.params.id}, {'note':doc._id})
			// execute the above query
			.exec(function(err, doc){
				// log any errors
				if (err){
					console.log(err);
				} else {
					// or send the document to the browser
					res.send(doc);
				}
			});
		}
	});
});



module.exports = router;
