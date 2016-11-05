var express = require('express');
var router = express.Router();
var request = require('request'); 
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var article = require('../models').article;
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



module.exports = router;
