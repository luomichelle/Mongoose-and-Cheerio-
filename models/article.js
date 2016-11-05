// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

var ArticleSchema = {
  name: "article",
  schema: new Schema({
  
    title: {
      type:String,
     required:true
    },

    link: {
      type:String,
      required:true
    },
  // this only saves one note's ObjectId. ref refers to the Note model.
    note: {
      type: Schema.Types.ObjectId,
      ref: 'Note'
    }
  })
};



// export the model
module.exports = ArticleSchema;
