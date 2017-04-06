/* global module */
'use strict';

var form = require('express-form')
.configure({dataSources: ['body', 'files', 'query', 'params']}),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('name'),
  field('position'),
  field('description'),
  validate('name')
    .required("", "NAME_REQUIRED"),
  validate('position')
    .required("", "POSITION_REQUIRED"),
  validate('description')
    .required("", "DESCRIPTION_REQUIRED")
);
