var http = require('http');
var app = require('./server/config/express')();
require('./server/config/database.js');
http.createServer(app).listen(app.get('port'), function() {
  console.log('http://localhost:3000');
});
