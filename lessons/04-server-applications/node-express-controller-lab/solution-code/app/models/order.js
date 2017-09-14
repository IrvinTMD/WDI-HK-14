var mongoose = require('mongoose');  
var orderSchema = new mongoose.Schema({
  price:          Number,
  created_at:   { type: Date, default: Date.now },
  products : [{
    name : String,
    price : Number,
    description: String
  }],
  address: {
    street: String,
    postcode: String,
    town: String
    country: String
  }
});
mongoose.model('Order', orderSchema);


    - Adress(Object)
      - Street(String)
      - Postcode(String)
      - Town(String)
      - Country(String)
    - Products(Array of Product references)
    - User(Embedded User)
