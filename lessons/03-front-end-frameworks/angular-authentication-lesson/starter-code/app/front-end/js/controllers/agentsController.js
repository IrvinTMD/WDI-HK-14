angular
  .module('mi6')
  .controller('agentsController', AgentController)

AgentController.$inject = ['Agent']
function AgentController(Agent) {
  var self = this;

  self.all    = [];
  self.agent  = {};

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) {
      console.log(res);

      // display agents
    }

    self.message = res.message;
  }

  self.authorize = function() {
  }

  self.join = function() {
  }

  self.disappear = function() {
  }

  self.getAgents = function() {
    self.all = Agent.query();
  }

  self.getAgents();

  return self;
}