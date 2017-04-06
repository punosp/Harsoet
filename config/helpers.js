'use strict';

// if (process.env.NODE_ENV === 'staging') {
//   var Handlebars = require('sails/node_modules/express-handlebars/node_modules/handlebars');
// } else {
  var Handlebars = require('handlebars');
//}
 var layouts = require('handlebars-layouts');

layouts.register(Handlebars);

Handlebars.registerHelper('ifCond', function (v1, v2, options) {

  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = Handlebars.helpers;
