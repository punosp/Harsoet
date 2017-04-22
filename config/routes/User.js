'use strict';

module.exports.routes = {
  'get /': {
    controller: 'UserController',
    action: 'homepage'
  },
  'get /aboutUs': {
    controller: 'UserController',
    action: 'aboutUs'
  },
  'get /services': {
    controller: 'UserController',
    action: 'services'
  },
  'get /contactUs': {
    controller: 'UserController',
    action: 'contactUs'
  },
  'get /apply': {
    controller: 'UserController',
    action: 'apply'
  },
  'get /updates': {
    controller: 'UserController',
    action: 'updates'
  },
  'get /history': {
    controller: 'UserController',
    action: 'history'
  },
  'get /team': {
    controller: 'UserController',
    action: 'team'
  },
  'get /faq': {
    controller: 'UserController',
    action: 'faq'
  },
  'get /feedback': {
    controller: 'UserController',
    action: 'feedback'
  },
  'get /mbbs': {
    controller: 'UserController',
    action: 'mbbs'
  },
  'get /job': {
    controller: 'UserController',
    action: 'job'
  },
  'post /user/requestCallBack': {
    controller: 'UserController',
    action: 'requestCallBack'
  },
  'get /show/:id/news': {
    controller: 'UserController',
    action: 'showNews'
  },
  'get /error': {
    controller: 'UserController',
    action: 'errorPage'
  }

};
