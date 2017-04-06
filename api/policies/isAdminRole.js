/* global module, AppAuthService, ApiResponseService */
var _ = require('lodash');

// policies/canWrite.js
module.exports = function isAdminRole(req, res, next) {
  // check if the loaded user is admin
  if (req.userRole !== 'ROLE_ADMIN') {
    req.logout();

    
    return res.redirect('/user/new/login');
  }

  return next();
};
