/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('name'),
  field('email'),
  field('password'),
  field('phone'),
  field('role'),
  validate('email')
    .required("", "REGISTRATION_EMAIL_REQUIRED")
    .isEmail("REGISTRATION_INVALID_EMAIL"),
  validate('password')
    .required("", "REGISTRATION_PASSWORD_REQUIRED")
    .minLength(6, "REGISTRATION_PASSWORD_MIN_LENGTH"),
  validate('phone')
    .isNumeric("MUST_BE_NUMBER")
    .required("", "REGISTRATION_PHONE_NO_REQUIRED")
    .minLength(10, "REGISTRATION_PHONE_MIN_LENGTH")
    .maxLength(10, "REGISTRATION_PHONE_MAX_LENGTH"),
  validate('name')
    .required("", "NAME_REQUIRED"),
  validate('role')
    .required("", "ROLE_REQUIRED")

);
