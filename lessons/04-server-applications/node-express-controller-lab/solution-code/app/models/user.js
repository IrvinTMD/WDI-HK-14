var mongoose = require('mongoose');  
var userSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
});
mongoose.model('User', userSchema);
