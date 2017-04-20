/* global module */
'use strict';

var form = require('express-form')
.configure({dataSources: ['body', 'files', 'query', 'params']}),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('name'),
  field('city'),
  field('country'),
  field('established'),
  field('fee'),
  field('details'),
  validate('name')
    .required("", "COLLEGE_NAME_REQUIRED"),
  validate('city')
    .required("", "CITY_REQUIRED"),
  validate('country')
    .required("", "COUNTRY_REQUIRED"),
  validate('established')
    .required("", "ESTABLISHMENT_YEAR_REQUIRED")
    .isNumeric("ESTABLISHMENT_YEAR_MUST_BE_NUMBER"),
  validate('fee')
    .required("", "FEE_REQUIRED")
    .isNumeric("FEE_MUST_BE_NUMBER"),
  validate('details')
    .required("", "COLLEGE_DETAILS_REQUIRED")
);
