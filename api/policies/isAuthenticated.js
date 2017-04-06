/* global Role */

'use strict';
module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    req.userRole = req.user.role.name;
    console.log(req.userRole);
    return next();
  }
  else {
    req.logout();
    return res.redirect('/admin/login');
  }
};
