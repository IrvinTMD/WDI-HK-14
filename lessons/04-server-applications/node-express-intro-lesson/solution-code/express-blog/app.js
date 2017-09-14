var express    = require('express');
var app        = express();
var port       = process.env.PORT || 3000;
var router     = require("./config/routes");
var bodyParser = require("body-parser");


app.set('views', './views');
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);
app.listen(port);

console.log("Server started on " + port);
