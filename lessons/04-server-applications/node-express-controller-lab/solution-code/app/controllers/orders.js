var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

Order = mongoose.model('Order')

// Get values from request. These can be done through forms or REST calls
        
function extractData(req){
  console.log(req.body)
  return {
          title:       req.body.title,
          excerpt:     req.body.excerpt,
          releaseDate: req.body.releaseDate,
          author:      req.body.author,
          style:       req.body.style
        }
}

// http://127.0.0.1:3000/orders
router.route('/')
  //GET all blobs
  .get(function(req, res, next) {
      Order.find({}, function (err, orders) { //retrieve all blobs from Monogo
      
            if (err) {
                return console.error(err);
            } else {
                res.format({
                  //JSON response will show all blobs in JSON format
                  json: function(){
                      res.json(orders);
                  }
              });
            }     
      });
  })
  //POST a new blob
  .post(function(req, res) {
      
      //call the create function for our database
      Order.create(req.body, function (err, order) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                console.log('POST creating new order: ' + order);
                res.format({
                  json: function(){
                      res.json(order);
                  }
              });
            }
      })
  })

// Show a Order
router.route('/:id')

  .get(function(req,res){
    Order.findById(req.params.id, function (err, order) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + order._id);
        var releaseDate = (order.releaseDate || new Date()).toISOString();
        releaseDate = releaseDate.substring(0, releaseDate.indexOf('T'))
        res.format({
          json: function(){
              res.json(order);
          }
        });
      }
    });
  })
  .delete(function(req, res){
    Order.findById(req.params.id, function (err, order) {
        if (err) {
            return console.error(err);
        } else {
          order.remove(function (err, order) {
              if (err) {
                  return console.error(err);
              } else {
                //Returning success messages saying it was deleted
                console.log('DELETE removing ID: ' + order._id);
                res.format({
                  json: function(){
                     res.json({message : 'deleted',
                         item : order
                     });
                   }
                });
              }
          });
        }
    });
  });

//Update a order
router.put('/:id/edit', function(req, res) {
  Order.findOneAndUpdate(req.params.id, req.body, {new: true}, function (err, order) {
    if (err) 
      res.send("There was a problem updating the information to the database: " + err);
    else
      res.format({
        json: function(){ res.json(order); }
      });
  });
});



module.exports = router