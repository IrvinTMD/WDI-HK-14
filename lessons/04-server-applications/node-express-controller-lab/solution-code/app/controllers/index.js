var express = require('express')
  , router = express.Router()

router.use('/orders', require('./orders'))
router.use('/users', require('./users'))
router.use('/products', require('./products'))

router.get('/', function(req, res) {
  res.send('Welcome to the amazen app')
})


module.exports = router
