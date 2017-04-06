/* global module */
'use strict';

var form = require('express-form')
.configure({dataSources: ['body', 'files', 'query', 'params']}),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('about'),
  field('history'),
  field('NoOfConsultents'),
  field('NoOfServicesProvided'),
  validate('about')
    .required("", "ABOUT_REQUIRED"),
  validate('history')
    .required("", "HISTORY_REQUIRED"),
  validate('NoOfConsultents')
    .required("", "CONSULTANTS_REQUIRED"),
  validate('NoOfServicesProvided')
    .required("", "SERVICES_REQUIRED")
);
