var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    

User = mongoose.model('User')


router.post("/", function(req, res) {


	var userObject = new User(req.body.user);

	// save user to database
	userObject.save(function(err, user) {
		console.log(err)
	  if(err){
      return res.status(401).send({message: err.errmsg});
    }else{
      return res.status(200).send({message: "user created"});
    }

	});      
   
})

router.post("/authenticate", function(req, res) {
  var userParams = req.body.user;
  if(userParams.email == undefined || userParams.password == undefined)
    return res.status(401).send({message: "you need to provide an email and a password for authentication"});
  
  User.findOne({ email: userParams.email }, function(err, user) {
    user.authenticate(userParams.password, function(err, isMatch) {
      if (err) throw err;
      if(isMatch){
        return res.status(200).send({message: "Valid Credentials !"});
      }else{
        return res.status(401).send({message: "the credentials provided do not correspond to a registered user"});
      
        
      }
        
    })
  })
})



module.exports = router
