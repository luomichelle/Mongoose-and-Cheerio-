// controller for our notes
// ========================

// get the date formatting function from out scripts
var makeDate = require('../scripts/date.js');
// take in our headline and note mongoose models
var Headline = require('../models/Headline');
var Note = require('../models/Note');

// save a note
// export this function as "save" (data = note info, cb = callback)
exports.save = function(data, cb) {
  
  // create a formatted date
  var formattedDate = makeDate();

  // make a newNote with the note model, saving the apropos info
  var newNote = new Note ({
    _headlineId:data.id,
    date:data.date,
    noteText:data.note
  });

  // save the newNote we made to mongoDB with mongoose's save function
  newNote.save(function(err, doc){
    // log any errors
    if (err) {
      console.log(err);
    } 
    // or just log the doc we saved
    else{
      console.log(doc);
      // and place the log back in this callback function
      // so it can be used with other functions asynchronously
      cb(doc);
    }
  });
};

// gather notes for a news article.
// export this function as gather (cb = callback, data = an article obj)
exports.gather = function(data, cb) {
  // find all notes with the headline id from the article we passed
  Note.find({
    _headlineId: data.id
  })
  // and sort the results
  .sort({
    id: -1
  })
  // now, execute this query
  .exec(function(err, doc) {
    // pass the data to our callback 
    // so it can be used asynchronously
    cb(doc);
  });
};

// delete all notes from an article
// Export this function as delete (data = article, cb = callback)
exports.delete = function(data, cb) {
  // remove a Note using mongoose and our note Model,
  // searching by the article's id
  Note.remove({
    _headlineId:data.id
  }, function(err, removed){
    // log any errors
    if(err){
      console.log(err);
    } 
    // or tell the console the delete was successful
    else {
      console.log("Delete Sucessful");
      // and send the "removed" data to our callback function
      cb(removed);
    }
  });
};
