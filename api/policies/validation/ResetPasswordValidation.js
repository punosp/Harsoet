/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('newPassword'),
  field('confirmPassword'),

  validate('newPassword')
    .required("", "NEW_PASSWORD_REQUIRED")
    .minLength(6, "NEW_PASSWORD_MIN_LENGTH"),
  validate('confirmPassword')
    .required("", "CONFIRM_PASSWORD_REQUIRED")
    .minLength(6, "CONFIRM_PASSWORD_MIN_LENGTH")


);
