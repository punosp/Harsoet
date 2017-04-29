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
  field('passYear'),
  field('city'),
  field('countryOpted'),
  field('pcbPercent'),
  field('medCollegeOpted'),
  field('passportStatus'),
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
  validate('passYear')
    .isNumeric("MUST_BE_VALID_YEAR")
    .maxLength(4, "PASSING_YEAR_MAX_LENGTH"),
  validate('city')
    .maxLength(50, "CITY_MAX_LENGTH"),
  validate('countryOpted')
    .maxLength(50, "COUNTRY_MAX_LENGTH"),
  validate('medCollegeOpted')
    .maxLength(50, "COLLEGE_MAX_LENGTH"),
  validate('pcbPercent')
    .maxLength(10, "PCB_MAX_LENGTH"),
  validate('passportStatus')
    .maxLength(1, "PASSPORT_MAX_LENGTH")

);
