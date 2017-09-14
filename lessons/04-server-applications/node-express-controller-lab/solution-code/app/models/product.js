var mongoose = require('mongoose');  
var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});
mongoose.model('Product', productSchema);
