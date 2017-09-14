var express = require('express');
var app = express();

// serve static files
app.use(express.static(__dirname + '/public'));

// gateway to client-side
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// listen to port as defined or default 3000
var port = process.env.PORT || 3000;

app.listen(port);

console.log('Server is running on port', port);