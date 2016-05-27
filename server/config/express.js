'use strict';

var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var morgan = require('morgan'); // Log request messages to console
var config = require('./config'); // Set some configs
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = function() {
  var app = express();
  app.set('port', config.port);
  app.use(express.static('./app'));

  /** Set up seed phrase to generate the token **/
  app.set('superSecret', config.secret); // secret variable

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // use morgan to log requests to the console
  app.use(morgan('dev'));

  /** Set up Cross Domain **/
  app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
  });

  /** Set up API to protect them **/

  // get an instance of the router for api routes
  var apiRoutes = express.Router();

  // route middleware to verify a token
  apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });

    } else {

      // if there is no token
      // return an error
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  app.use('/api', apiRoutes);

  // using the express-load to load the dao and controllers and routes
  load('dao', {cwd: 'server'})
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};
