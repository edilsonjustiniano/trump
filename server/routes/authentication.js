'use strict';

module.exports = function(app) {
  var controller = app.controllers.authentication;
  app.route('/authenticate')
    .post(controller.authenticate);
  //.post(controller.save)
  //.put(controller.edit);

  //app.route('/users/:name')
  //.get(controller.findByName);
  //.delete(controller.delete);

};
