// Server routes
// =============

// require express
var express = require('express');

// set up an Express router
var router = express.Router();

// bring in the Scrape function from our scripts dir
var scrape = require('../scripts/scrape.js');

// bring headlines and notes from the controller
var headlinesController = require('../controllers/headlines.js');
var notesController = require('../controllers/notes.js');

// basic route use cb return json data from mongodb
router.get('/', function(req, res) {
    res.render('home');
});

//route for testing our scrape
router.get('/test', function(req,res) {
    // grab the article information from nytimes
    scrape("http://www.nytimes.com", function(data) {
        // send to browser as json
        res.json(data);
    });
});

// get grab web scrape
router.post('/fetch', function(req, res) {
    // use the fetch function from the headlines controller,
    // this grabs all of the headlines from nyTimes and saves it to the db
    headlinesController.fetch();
    // send a success message to the browser
    res.send('success');
});

// check the mongodb for data
router.get('/check', function(req, res) {
    // use the check function from the headlines controller,
    // this checks all of our articles, sorted by id number
    headlinesController.check(function(data) {
        // send the article data to a json
        res.json(data);
    });
});

// gather the notes for an article from mongodb
router.post('/gather', function(req, res) {
    // gather all of the notes related to the article we pass
    notesController.gather(req.body, function(data) {
        // and send the notes as a json
        res.json(data);
    });
});

// post our saved note to the db
router.post('/save', function(req, res) {
    // using the article information passed through req.body
    // and the save function from the notes controller
    // saved the note
    notesController.save(req.body, function(data) {
        // send the note to the browser as a json
        res.json(data);
    });
});

// delete the notes of an article from mongodb
router.delete('/delete', function(req, res) {
    // using the notesController and the article passed in req.body
    // delete all of an articles notes
    notesController.delete(req.body, function(data) {
        // send the removal data to the browser as a json
        res.json(data);
    });
});

// export this router so our server file can refer to it.
module.exports = router;
