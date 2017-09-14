var express = require('express');
var router  = express.Router();

router.get("/", function(req, res) {
  res.render('index', { header: 'home' });
})

router.get("/about", function(req, res) {
  res.render('index', { header: 'about' });
})

router.get("/contact", function(req, res) {
  res.render('index', { header: 'contact' });
})

// CARS RESTFUL ROUTES
router.get('/posts/', function(req, res) {
  console.log("postRouter INDEX");
  res.send('INDEX');
});

router.get('/posts/new', function(req, res) {
  console.log("postRouter New");
  res.render('posts/form');
});

router.get('/posts/:id', function(req, res) {
  console.log("postRouter SHOW");
  res.send('SHOW');
});

router.post('/posts/', function(req, res) {
  console.log(req.body)
  console.log("postRouter CREATE");
  res.send('CREATE');
});

router.get('/posts/:id/edit', function(req, res) {
  console.log("postRouter SHOW");
  res.send('SHOW');
});

router.put('/posts/:id', function(req, res) {
  console.log("postRouter UPDATE");
  res.send('UPDATE');
});

router.delete('/posts/:id', function(req, res) {
  res.send('DELETE');
});

module.exports = router;