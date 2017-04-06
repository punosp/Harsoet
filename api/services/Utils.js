
'use strict';

var _ = require('lodash'),
  shortid = require('shortid');
module.exports = {

  generateReferenceId: generateReferenceId,

};


function generateReferenceId() {
  return shortid.generate();
}
