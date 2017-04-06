/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('name'),
  field('password'),
  field('role'),
  validate('password')
    .required("", "REGISTRATION_PASSWORD_REQUIRED")
    .minLength(6, "REGISTRATION_PASSWORD_MIN_LENGTH"),
  validate('name')
    .required("", "NAME_REQUIRED"),
  validate('role')
    .required("", "ROLE_REQUIRED")

);
