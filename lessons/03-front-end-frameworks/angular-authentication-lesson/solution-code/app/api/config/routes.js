var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var authenticationController = require('../controllers/authenticationController');
var agentsController = require('../controllers/agentsController');

router.post('/authorize', authenticationController.login);
router.post('/join', authenticationController.signup);

router.route('/agents')
  .get(agentsController.indexAgents)
  .post(agentsController.createAgent)

router.route('/agents/:id')
  .get(agentsController.showAgent)
  .put(agentsController.updateAgent)
  .delete(agentsController.deleteAgent)

module.exports = router;