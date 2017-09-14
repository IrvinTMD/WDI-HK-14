var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var AgentSchema = mongoose.Schema({
  realname: { type: String },
  codename: { type: String, required: true, unique: true},
  password: { type: String },
  status:   { type: String },
  location: { type: String },
});

// Let's craft how our JSON object should look!
// http://mongoosejs.com/docs/api.html#document_Document-toObject
AgentSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    var returnJson = {
      id: ret._id,
      realname: ret.realname,
      codename: ret.codename,
      status: ret.status,
      location: ret.location
    };
    return returnJson;
  }
});

AgentSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  next();
});

AgentSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("Agent", AgentSchema);