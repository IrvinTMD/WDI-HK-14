var express = require("express");
var app = express();
var logger = require("morgan");
var bodyParser = require("body-parser");
// Need to connect the socket to the http server


app.set("views", __dirname + "/views");
app.use(logger('dev'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static("public", __dirname + "/public"));
app.use(bodyParser.json());

// Write your code here
