'use strict';

module.exports.routes = {
  'get /admin/:code/error': {
    controller: 'AdminController',
    action: 'errorPage'
  },
  'get /admin/dashBoard': {
    controller: 'AdminController',
    action: 'dashBoard'
  },
  'get /admin/login': {
  controller: 'AdminController',
  action: 'login'
  },
'post /admin/loginSubmit': {
    controller: 'AdminController',
    action: 'loginSubmit'
  },
  'get /admin/logout': {
    controller: 'AdminController',
    action: 'logout'
  },
  'get /admin/forgotPassword': {
    controller: 'AdminController',
    action: 'enterForgotPassword'
  },
  'post /admin/forgotPassword': {
    controller: 'AdminController',
    action: 'forgotPassword'
  },
  'get /admin/:email/resetPassword/:uniqueKey': {
    controller: 'AdminController',
    action: 'resetPassword'
  },
  'post /admin/:email/resetPassword/:uniqueKey': {
    controller: 'AdminController',
    action: 'resetPasswordSubmit'
  },
  'post /admin/changePassword': {
    controller: 'AdminController',
    action: 'changePassword'
  },
  'get /admin/new/changePassword': {
    controller: 'AdminController',
    action: 'enterChangedPassword'

  },
  'get /admin/changePassword': {
    controller: 'AdminController',
    action: 'enterChangedPassword'

  },
  'get /admin/aboutCompanyEdit': {
    controller: 'AdminController',
    action: 'aboutCompanyEdit'
  },
  'get /admin/companyAddressAdd': {
    controller: 'AdminController',
    action: 'companyAddressAdd'
  },
  'get /admin/companyFaqsAdd': {
    controller: 'AdminController',
    action: 'companyFaqsAdd'
  },
  'get /admin/companyNewsAdd': {
    controller: 'AdminController',
    action: 'companyNewsAdd'
  },
  'get /admin/teamAdd': {
    controller: 'AdminController',
    action: 'teamAdd'
  },
  'get /admin/companyAddress': {
    controller: 'AdminController',
    action: 'companyAddress'
  },
  'post /admin/addTeamMember': {
    controller: 'AdminController',
    action: 'addTeamMember'
  },
  'post /admin/addCompanyNews': {
    controller: 'AdminController',
    action: 'addCompanyNews'
  },
  'post /admin/addCompanyFaqs': {
    controller: 'AdminController',
    action: 'addCompanyFaqs'
  },
  'post /admin/aboutCompanyAdd': {
    controller: 'AdminController',
    action: 'aboutCompanyAdd'
  },
  'post /admin/addCompanyAddress': {
    controller: 'AdminController',
    action: 'addCompanyAddress'
  },
  'get /admin/aboutCompany': {
    controller: 'AdminController',
    action: 'aboutCompany'
  }
};
