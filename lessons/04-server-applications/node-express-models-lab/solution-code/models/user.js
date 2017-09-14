var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
    

var User = new mongoose.Schema({
    name:  { type: String }
    email: { type: String, required: true,  unique: true },
    password: { type: String, required: true }
});



// this middleware will be used evrytime the save action is performed onto a user instance (works for update too)
User.pre('save', function(next) {
  // if the password isnt different than the value in DB, we don't apply any encryption
  if (!this.isModified('password')) return next(); 

  // the first arguments corresponds to the number of "salting rounds that will be applied"
  bcrypt.genSalt(5, function(err, salt) {
    //now we use the salt generated 
    bcrypt.hash(this.password, salt, function(err, hash) {
      // the method hash will return the password hashed with the salt, we replace the original password attribute with the hashed one
      this.password = hash;
      next();
    });
  });
});

User.methods.authenticate = function(password, callback) {
  // compare is a bcrypt method that will return a boolean if the first argument once encrypted corresponds to the second argument
  bcrypt.compare(password, this.password, function(err, isMatch) {
      callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', User);