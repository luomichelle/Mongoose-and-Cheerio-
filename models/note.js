// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Note schema
var NoteSchema = {

	name: "note",
	schema: new Schema({
  // just a string
  		title: {
    		type:String
  		},
  // just a string
  		body: {
    		type:String
    }
  })
};


// export the Note model
module.exports = NoteSchema;
