'use strict';

//var Handlebars = require('handlebars');
var Handlebars = require('sails/node_modules/handlebars');
var layouts = require('handlebars-layouts');

layouts.register(Handlebars);

Handlebars.registerHelper('ifCond', function (v1, v2, options) {

if (v1 === v2) {
  return options.fn(this);
}
return options.inverse(this);
});

Handlebars.registerHelper("counter", function (index) {
return index + 1;
});
