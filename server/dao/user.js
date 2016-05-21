'use strict';

var Database = require('../config/database');
module.exports = function() {
  var db = Database;
  var dao = {
    findAll: function() {
      var session = db.getSession();
      return session.run("MATCH (a) RETURN a").then(function(result) {
        db.closeSession();
        db.closeDriver();
        return result;
      });
    },

    findByName: function(name) {
      var session = db.getSession();
      return session.run("MATCH (user) WHERE user.name =~ {param} RETURN user",
        {param: '(?i).*' + name + '.*'}
      ).then(function(result) {
        db.closeSession();
        db.closeDriver();
        return result;
      });
    }
  };
  return dao;
};
