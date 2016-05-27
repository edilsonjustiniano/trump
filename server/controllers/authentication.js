'use strict';

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = function(app) {

  //var userDao = app.dao.user;

  var controller = {};

  controller.authenticate = function(req, res) {
    var user = {
      username: req.body.username,
      password: req.body.password
  };

    if (!user.username) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user.username) {

      // check if password matches
      if (!user.password && user.password != 'admin') {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'),
            { expiresIn: '1h' }
        );

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  };

  return controller;
};
