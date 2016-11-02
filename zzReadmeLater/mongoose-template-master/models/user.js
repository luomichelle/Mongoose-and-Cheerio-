var Schema = require('mongoose').Schema;
var passwordUtil = require('../helpers/password');

var user = module.exports = {
  name: "User",
  schema: new Schema({
    username: {type: String, required: true, unique: true},
    password_hash: {type: String, required: true}
  })
};

user.schema.methods.validatePassword = function(pw, cb) {
  passwordUtil.validate(pw, this.password_hash, cb);
}
