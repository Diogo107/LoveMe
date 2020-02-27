'use strict';

// Route Guard Middleware
// This piece of middleware is going to check if a user is authenticated
// If not, it sends the request to the app error handler with a message
module.exports = (req, res, next) => {
  console.log('This is the route guard values', req.user.validation);
  if (req.user && req.user.validation == true) {
    next();
  } else {
    console.log('Get me out of here!!!!!');
    const error = new Error('AUTHENTICATION_REQUIRED');
    error.status = 401;
    next(error);
  }
};
