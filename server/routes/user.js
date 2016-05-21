'use strict';

module.exports = function(app) {
  var controller = app.controllers.user;
  app.route('/users')
    .get(controller.findAll);
  //.post(controller.save)
  //.put(controller.edit);

  app.route('/users/:name')
    .get(controller.findByName);
  //.delete(controller.delete);

};
