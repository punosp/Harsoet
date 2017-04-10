/* global module */
'use strict';

var form = require('express-form')
.configure({dataSources: ['body', 'files', 'query', 'params']}),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('address'),
  field('pin'),
  field('city'),
  field('state'),
  field('country'),
  field('phone'),
  field('email'),
  field('from'),
  field('to'),
  field('status'),
  validate('address')
    .required("", "ADDRESS_REQUIRED"),
  validate('pin')
    .required("", "PIN_REQUIRED"),
  validate('city')
    .required("", "CITY_REQUIRED"),
  validate('state')
    .required("", "STATE_REQUIRED"),
  validate('country')
    .required("", "COUNTRY_REQUIRED"),
  validate('phone')
    .required("", "COMPANY_PHONE_REQUIRED")
    .isNumeric("PHONE_MUST_BE_NUMBER"),
  validate('email')
    .required("", "COMPANY_EMAIL_REQUIRED")
    .isEmail("REGISTRATION_INVALID_EMAIL"),
  validate('from')
    .required("", "FROM_REQUIRED"),
  validate('to')
    .required("", "TO_REQUIRED"),
  validate('status')
    .required("", "STATUS_REQUIRED")
);
