/* global module */
'use strict';

var form = require('express-form')
.configure({dataSources: ['body', 'files', 'query', 'params']}),
  field = form.field,
  validate = form.validate;

module.exports = form(
  field('question'),
  field('answer'),
  validate('question')
    .required("", "QUESTION_REQUIRED"),
  validate('answer')
    .required("", "ANSWER_REQUIRED")
);
