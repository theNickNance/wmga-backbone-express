/**
 * user routes
 */

'use strict';

var User = require('../controllers/user');

var routes = function(app) {
  app.get('/rest/users', User.getList);
  app.get('/rest/users/:id', User.getById);
  app.post('/rest/users', User.addUser);
  app.post('/rest/users/email', User.emailAllUsers);
  app.post('/rest/users/notify', User.notifyAllUsers);
  //signin route
  app.post('/rest/signin', User.validateSignIn);
  app.post('/rest/users/requestpassword', User.requestPassword);
};

module.exports = routes;
