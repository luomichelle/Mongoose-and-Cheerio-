// Headline model
// ==============

// require mongoose
var mongoose = require('mongoose');

// create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// create the headlineSchema with our schema class
var headlineSchema = new Schema({
	// headline, a string, must be entered
  headline: {
    type: String,
    required: true
  },
  // summary, a string, must be entered
  summary:{
    type: String,
    required: true
  },
  // date is just a string
  date: String,
});

// create the Headline model using the headlineSchema
var Headline = mongoose.model('Headline', headlineSchema);

// export the Headline model
module.exports = Headline;
