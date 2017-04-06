'use strict';
var passport = require('passport');

module.exports = function(req, res, next){
  console.log("inside policy");
  return passport.authenticate('local', function (err, user, info) {
    if (err) {
      sails.log.error("local login error :: ", err);
      // TODO: redirect to login page with flash error message
      var errors = err.message;

      req.flash("errors", errors);
      return res.redirect('/admin/login');
    } else if (!user) {
      sails.log.error("local login error :: user not found");
      // TODO: redirect to login page with flash error message
      return res.redirect('/admin/login');
    } else {
      req.login(user, function (err) {
        if (err) {
          sails.log.error('login error', err);
          // TODO: redirect to login page with flash error message
          req.flash('error', 'Oops... there was an error, please try again');
          return res.redirect('/admin/login');
        }
        sails.log.info("Login successfull :: ", user);
        console.log("hello");
        // TODO: succesfull login redirect to dashboard - or some page
        return next();
      });
    }
  })(req, res, next);
};
