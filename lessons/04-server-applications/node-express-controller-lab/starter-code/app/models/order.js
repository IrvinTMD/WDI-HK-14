var mongoose = require('mongoose');
var orderSchema = new mongoose.Schema({
  price:          Number,
  releaseDate:   { type: Date, default: Date.now },
  products : [{
    name : String,
    price : Number,
    description: String
  }],
  delivery_address: {
    street: String,
    postcode: String,
    country: String
  }
});
mongoose.model('Order', orderSchema);
