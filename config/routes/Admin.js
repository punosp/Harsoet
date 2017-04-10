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
  'get /admin/companyFaqs': {
    controller: 'AdminController',
    action: 'companyFaqs'
  },
  'get /admin/companyFaqsAdd': {
    controller: 'AdminController',
    action: 'companyFaqsAdd'
  },
  'post /admin/addCompanyFaqs': {
    controller: 'AdminController',
    action: 'addCompanyFaqs'
  },
  'get /admin/faqs/:id/edit': {
    controller: 'AdminController',
    action: 'companyFaqsEdit'
  },
  'post /admin/faqs/:id/update': {
    controller: 'AdminController',
    action: 'companyFaqsUpdate'
  },
  'get /admin/faqs/:id/delete': {
    controller: 'AdminController',
    action: 'companyFaqDelete'
  },
  'get /admin/companyNews': {
    controller: 'AdminController',
    action: 'companyNews'
  },
  'get /admin/companyNewsAdd': {
    controller: 'AdminController',
    action: 'companyNewsAdd'
  },
  'post /admin/addCompanyNews': {
    controller: 'AdminController',
    action: 'addCompanyNews'
  },
  'get /admin/news/:id/edit': {
    controller: 'AdminController',
    action: 'companyNewsEdit'
  },
  'post /admin/news/:id/update': {
    controller: 'AdminController',
    action: 'companyNewsUpdate'
  },
  'get /admin/news/:id/delete': {
    controller: 'AdminController',
    action: 'companyNewsDelete'
  },
  'get /admin/team': {
    controller: 'AdminController',
    action: 'team'
  },
  'get /admin/teamAdd': {
    controller: 'AdminController',
    action: 'teamAdd'
  },
  'post /admin/addTeamMember': {
    controller: 'AdminController',
    action: 'addTeamMember'
  },
  'get /admin/team/:id/edit': {
    controller: 'AdminController',
    action: 'teamEdit'
  },
  'post /admin/team/:id/update': {
    controller: 'AdminController',
    action: 'teamUpdate'
  },
  'get /admin/team/:id/delete': {
    controller: 'AdminController',
    action: 'companyTeamDelete'
  },
  'get /admin/aboutCompany': {
    controller: 'AdminController',
    action: 'aboutCompany'
  },
  'get /admin/aboutCompanyEdit': {
    controller: 'AdminController',
    action: 'aboutCompanyEdit'
  },
  'post /admin/aboutCompanyAdd': {
    controller: 'AdminController',
    action: 'aboutCompanyAdd'
  },
  'get /admin/companyAddress': {
    controller: 'AdminController',
    action: 'companyAddress'
  },
  'get /admin/companyAddressAdd': {
    controller: 'AdminController',
    action: 'companyAddressAdd'
  },
  'post /admin/addCompanyAddress': {
    controller: 'AdminController',
    action: 'addCompanyAddress'
  },
  'get /admin/address/:id/edit': {
    controller: 'AdminController',
    action: 'companyAddressEdit'
  },
  'post /admin/address/:id/update': {
    controller: 'AdminController',
    action: 'companyAddressUpdate'
  },
  'get /admin/address/:id/delete': {
    controller: 'AdminController',
    action: 'companyAddressDelete'
  }
};
