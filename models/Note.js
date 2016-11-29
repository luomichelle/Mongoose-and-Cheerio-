// Note model
// ==========

// require mongoose
var mongoose = require('mongoose');
// create the schema class using mongoose's schema method
var Schema = mongoose.Schema;

// create the noteSchema with the schema object
var noteSchema = new Schema({
	// the headline is the article associate with the note
  _headlineId: {
      type: Schema.Types.ObjectId,
      ref: 'Headline'
  },
  // date is just a string
  date: String,
  // as is the noteText
  noteText: String
});

// create the Note model using the noteSchema
var Note = mongoose.model('Note', noteSchema);

// export the Note model
module.exports = Note;
