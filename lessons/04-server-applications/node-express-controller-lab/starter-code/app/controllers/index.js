var express = require('express')
  , router = express.Router()

router.use('/orders', require('./orders'))

router.get('/', function(req, res) {
  res.send('Welcome to the book app')
})


module.exports = router