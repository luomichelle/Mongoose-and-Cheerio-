// controller for our headlines
// ============================

// bring in our scrape script and makeDate scripts
var scrape = require('../scripts/scrape.js');
var makeDate = require('../scripts/date.js');

// bring in the Headline and Note mongoose models
var Headline = require('../models/Headline');
var Note = require('../models/Note');


// export this function as "fetch"
exports.fetch = function() {

  // run scrape function
  scrape("http://www.nytimes.com", function(data) {
    // save the data from scrape to obj
    var obj = data;

    // create a user-readable date with our makeDate script
    var formattedDate = makeDate();

    // loop over object's results 
    for (var i in obj) {
      // checks for duplicates. See the definition of this function below
      addIfNotFound(i);
    }

    // check to see if entry exists, and add if it to our db if it does not
    // note, current is the iterator
    function addIfNotFound(current) {
      // look for a match by the headline of the current article
      Headline.findOne({
        'headline': obj[current][0]
      }, function(err, res) {
        // log any errors
        if (err) {
          console.log(err);
        }
        // or, if there is no match (and thus no duplicate)
        if (res === null) {
          // create a new entry object using our Headline model
          var headlineEntry = new Headline({
            headline: obj[current][0],
            summary: obj[current][1],
            date: formattedDate
          });
          // save new entry to db
          headlineEntry.save(function(err) {
            // log any errors
            if (err) {
              console.log(err);
            } 
            // or tell the console we added the article succesffuly
            else {
              console.log('successfully added');
            }
          });
        }
      });
    }

  });
};

// export this function as "check" (cb is a callback function)
exports.check = function(cb) {
  // prepare a query to get the data we scraped, 
  // and sort starting from most recent (sorted by id num)
  Headline.find()
    .sort({
      _id: -1
    })
    // execute this query
    .exec(function(err, doc) {
      // once finished, pass the list into the callback function
      cb(doc);
    });
};
