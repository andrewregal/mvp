var express = require('express');
var app = express();

app.use(express.static('./../client'));


app.listen(8080, function () {
  console.log('Listening on port 8080!');
});

app.get('/', function (req, res) {
  res.send(200);
});
