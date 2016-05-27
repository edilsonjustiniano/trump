'use strict';

module.exports = function(app) {
  var controller = app.controllers.user;
  app.route('/api/users')
    .get(controller.findAll);
  //.post(controller.save)
  //.put(controller.edit);

  app.route('/api/users/:name')
    .get(controller.findByName);
  //.delete(controller.delete);

};
