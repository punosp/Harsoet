'use strict';

<<<<<<< HEAD
var Handlebars = require('handlebars');
//var Handlebars = require('sails/node_modules/handlebars');
=======
//var Handlebars = require('handlebars');
if (process.env.NODE_ENV === 'production') {
  var Handlebars = require('handlebars');
}
else {
  var Handlebars = require('sails/node_modules/handlebars');
}

>>>>>>> 730f6a56156c923b86fcd2b1e7a0064cf186c65e
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
