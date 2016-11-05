
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

var passwordUtil = require('../helpers/password');

var user = {
  name: "User",   //db name
  schema: new Schema({
    username: {
    	type: String, 
    	required: true, 
    	unique: true
    },
    password_hash: {
    	type: String, 
    	required: true
    },
      notes: [{
  		// store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // the ObjectIds will refer to the ids in the Note model
      ref: 'Note'
  	}]
  })
};

user.schema.methods.validatePassword = function(pw, cb) {
  passwordUtil.validate(pw, this.password_hash, cb);
}


module.exports = user;