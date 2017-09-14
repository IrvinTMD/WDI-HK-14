var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

Product = mongoose.model('Product')

// Get values from request. These can be done through forms or REST calls



// http://127.0.0.1:3000/Products
router.route('/')
  //GET all blobs
  .get(function(req, res, next) {
      Product.find({}, function (err, products) { //retrieve all blobs from Monogo

            if (err) {
                return console.error(err);
            } else {
                res.format({
                  //JSON response will show all blobs in JSON format
                  json: function(){
                      res.json(products);
                  }
              });
            }
      });
  })
  //POST a new blob
  .post(function(req, res) {

      //call the create function for our database
      Product.create(req.body, function (err, product) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                console.log('POST creating new product: ' + product);
                res.format({
                  json: function(){
                      res.json(product);
                  }
              });
            }
      })
  })

// Show a Product
router.route('/:id')

  .get(function(req,res){
    Product.findById(req.params.id, function (err, product) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + product._id);
        var releaseDate = (product.releaseDate || new Date()).toISOString();
        releaseDate = releaseDate.substring(0, releaseDate.indexOf('T'))
        res.format({
          json: function(){
              res.json(product);
          }
        });
      }
    });
  })
  .delete(function(req, res){
    Product.findById(req.params.id, function (err, product) {
        if (err) {
            return console.error(err);
        } else {
          product.remove(function (err, product) {
              if (err) {
                  return console.error(err);
              } else {
                //Returning success messages saying it was deleted
                console.log('DELETE removing ID: ' + product._id);
                res.format({
                  json: function(){
                     res.json({message : 'deleted',
                         item : product
                     });
                   }
                });
              }
          });
        }
    });
  });

//Update a product
router.put('/:id/edit', function(req, res) {
  Product.findOneAndUpdate(req.params.id, req.body, {new: true}, function (err, product) {
    if (err)
      res.send("There was a problem updating the information to the database: " + err);
    else
      res.format({
        json: function(){ res.json(product); }
      });
  });
});



module.exports = router
