angular
  .module('mi6')
  .controller('agentsController', AgentController)

AgentController.$inject = ['Agent', 'TokenService']
function AgentController(Agent, TokenService) {
  var self = this;

  self.all    = [];
  self.agent  = {};

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if (token) {
      console.log(res);
      self.getAgents();
      self.agent = TokenService.decodeToken();
    }

    self.message = res.message;
  }

  self.authorize = function() {
    Agent.authorize(self.agent, handleLogin);
  }

  self.join = function() {
    Agent.join(self.agent, handleLogin);
  }

  self.disappear = function() {
    TokenService.removeToken();
    self.all   = [];
    self.agent = {}; 
  }

  self.getAgents = function() {
    self.all = Agent.query();
  }

  self.isLoggedIn = function(){
    return !!TokenService.getToken();
  }

  if (self.isLoggedIn()) {
    self.getAgents();
    self.agent = TokenService.decodeToken();
  }

  return self;
}