var express = require('express'),
bodyParser  = require('body-parser'),
mongoose    = require('mongoose'),
expressJWT  = require('express-jwt'),
jwt         = require('jsonwebtoken'),
bcrypt      = require('bcrypt'),
app         = express();

mongoose.connect('mongodb://localhost:27017/MI6');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// our secret phrase, to help us make sure everything's encrypted the same way
var secret = "onhermajestyssecretservice";

// JWT access control. Important to have these before our routes, so it can run first!
app.use('/api/agents/:id', expressJWT({secret: secret}), function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
  next();
});
app.use('/api/safehouses', expressJWT({secret: secret}), function (error, request, response, next) {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({message: 'You need an authorization token to view confidential information.'});
  }
  next();
});


// require our model, so we can query to find the user trying to authorize
var Agent = require('./models/agent');

app.post('/api/authorizations', function(request,response){

  // codenames are unencrypted, let's search by that
  Agent.findOne({codename: request.body.codename}, function(error, agent){
    if (error) response.status(404).json({message: "There is no agent by that codename."})


    // compare name with bcrypt encrypted name
    if (bcrypt.compareSync(request.body.name, agent.name)) {

      // create JWT token & send it
      var token = jwt.sign(agent, secret);
      response.json({ agent: agent, token: token });

    } else {
      // if name is not what you claim it is, you get a 401 Not Authorized
      response.status(401).json({message: "You don't have clearance, agent."});
    };

  });


});

var routes = require('./config/routes');
app.use('/api', routes);

app.listen(3000);