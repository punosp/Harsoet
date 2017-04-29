/* global module */
'use strict';

var form = require('express-form'),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('name'),
  field('email'),
  field('phone'),
  field('message'),
  field('subject'),
  validate('email')
    .isEmail("INVALID_EMAIL")
    .required("", "EMAIL_REQUIRED")
    .maxLength(50, "MAX_EMAIL_LENGTH"),
  validate('name')
    .required("", "NAME_REQUIRED")
    .maxLength(50, "MAX_NAME_LENGTH"),
  validate('phone')
    .maxLength(20, "PHONE_MAX_LENGTH"),
  validate('message')
    .required("", "MESSAGE_REQUIRED")
    .maxLength(2000, "MESSAGE_MAX_LENGTH"),
  validate('subject')
    .maxLength(100, "SUBJECT_MAX_LENGTH")

);
