var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

User = mongoose.model('User')

// Get values from request. These can be done through forms or REST calls
        


// http://127.0.0.1:3000/users
router.route('/')
  //GET all blobs
  .get(function(req, res, next) {
      User.find({}, function (err, users) { //retrieve all blobs from Monogo
      
            if (err) {
                return console.error(err);
            } else {
                res.format({
                  //JSON response will show all blobs in JSON format
                  json: function(){
                      res.json(users);
                  }
              });
            }     
      });
  })
  //POST a new blob
  .post(function(req, res) {
      
      //call the create function for our database
      User.create(req.body, function (err, user) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                console.log('POST creating new user: ' + user);
                res.format({
                  json: function(){
                      res.json(user);
                  }
              });
            }
      })
  })

// Show a User
router.route('/:id')

  .get(function(req,res){
    User.findById(req.params.id, function (err, user) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + user._id);
        var releaseDate = (user.releaseDate || new Date()).toISOString();
        releaseDate = releaseDate.substring(0, releaseDate.indexOf('T'))
        res.format({
          json: function(){
              res.json(user);
          }
        });
      }
    });
  })
  .delete(function(req, res){
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return console.error(err);
        } else {
          user.remove(function (err, user) {
              if (err) {
                  return console.error(err);
              } else {
                //Returning success messages saying it was deleted
                console.log('DELETE removing ID: ' + user._id);
                res.format({
                  json: function(){
                     res.json({message : 'deleted',
                         item : user
                     });
                   }
                });
              }
          });
        }
    });
  });

//Update a user
router.put('/:id/edit', function(req, res) {
  User.findOneAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
    if (err) 
      res.send("There was a problem updating the information to the database: " + err);
    else
      res.format({
        json: function(){ res.json(user); }
      });
  });
});



module.exports = router