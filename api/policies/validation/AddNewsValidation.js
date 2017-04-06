/* global module */
'use strict';

var form = require('express-form')
.configure({dataSources: ['body', 'files', 'query', 'params']}),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('heading'),
  field('description'),
  validate('heading')
    .required("", "HEADING_REQUIRED"),
  validate('description')
    .required("", "DESCRIPTION_REQUIRED")
);
