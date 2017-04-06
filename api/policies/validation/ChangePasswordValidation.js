/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('oldPassword'),
  field('newPassword'),

  validate('oldPassword')
    .required("", "OLD_PASSWORD_REQUIRED")
    .minLength(6, "OLD_PASSWORD_MIN_LENGTH"),
  validate('newPassword')
    .required("", "NEW_PASSWORD_REQUIRED")
    .minLength(6, "NEW_PASSWORD_MIN_LENGTH")


);
