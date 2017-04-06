/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('email'),
  field('password'),
  validate('email')
    .required("", "REGISTRATION_EMAIL_REQUIRED")
    .isEmail("REGISTRATION_INVALID_EMAIL"),
  validate('password')
    .required("", "REGISTRATION_PASSWORD_REQUIRED")
    .minLength(6, "REGISTRATION_PASSWORD_MIN_LENGTH")


);
