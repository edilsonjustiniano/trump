'use strict';

module.exports = function(app) {

  var userDao = app.dao.user;

  var controller = {};

  controller.findAll = function(req, res) {
    userDao.findAll().then(function(result) {
      res.json(result);
    }, function(error) {
      res.status(500).json(error);
    });
  };

  controller.findByName = function(req, res) {
    var name = undefined;
    if (req.params && req.params.name) {
      name = req.params.name;
    }

    if (name) {
      userDao.findByName(name).then(function(result) {
        res.json(result);
      }, function(error) {
        res.status(500).json(error);
      });
    } else {
      res.status(500).json("Name not informed");
    }
  };

  return controller;
};
