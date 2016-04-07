var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/style', express.static(path.join(__dirname, 'style')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/', express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
