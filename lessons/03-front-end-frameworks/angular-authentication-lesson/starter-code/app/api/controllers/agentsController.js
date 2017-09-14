var Agent = require('../models/agent');

function indexAgents(req, res){
  Agent.find(function(error, agents){
    if (error) return res.status(404).json({message: 'There is no MI6, and there are no agents here.'});
    return res.status(200).send(agents);
  });
}

function createAgent(req, res){
  var agent = new Agent(req.body);
  agent.save(function(error){
    if (error) return res.status(403).send({message: "One cannot just create an agent. An agent must be trained."})
    return res.status(200).send(agent);
  });
}

function showAgent(req, res){
  var id = req.params.id;
  Agent.findById({_id: id}, function(error, agent){
    if (error) return res.status(404).send({message: 'You seem to be mistaken, we have no agent with that identity.'})
    return res.status(200).send(agent);
  });
}

function updateAgent(req, res){
  var id = req.params.id;
  Agent.findById({_id: id}, function(error, agent) {
    if (error) return res.status(404).send({message: 'You seem to be mistaken, we have no agent with that identity.'})

    if (req.body.realname) agent.realname = req.body.realname;
    if (req.body.codename) agent.codename = req.body.codename;
    if (req.body.status) agent.status     = req.body.status;
    if (req.body.location) agent.location = req.body.location;

    agent.save(function(error) {
      if (error) return res.status(500).send({message: "There seems to be some error in updating your agent."})
      return res.status(200).send(agent);
    });
  });
}

function deleteAgent(req, res){
  var id = req.params.id;
  Agent.remove({_id: id}, function(error) {
    if (error) res.status(404).send({message: 'You seem to be mistaken, we have no agent with that identity.'})
    res.status(204);
  });
  return;
}

module.exports = {
  indexAgents: indexAgents,
  createAgent: createAgent,
  showAgent: showAgent,
  updateAgent: updateAgent,
  deleteAgent: deleteAgent
}