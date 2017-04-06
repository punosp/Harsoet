/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('email'),
  validate('email')
    .required("", "REGISTRATION_EMAIL_REQUIRED")
    .isEmail("REGISTRATION_INVALID_EMAIL")



);
