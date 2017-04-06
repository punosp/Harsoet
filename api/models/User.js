/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 'use strict';
 var Q = require('q'),
   _ = require('lodash');
module.exports = {

  attributes: {
    name: {
        type: 'string',
        columnName: 'name'
      },
      email: {
        type: 'string',
        columnName: 'email',
        unique: true
      },
      phone: {
        type: 'integer',
        columnName: 'phone'
      },
      message: {
        type: 'string',
        columnName: 'message'
      },
      passYear: {
        type: 'integer',
        columnName: 'passYear'
      },
      countryOpted: {
        type: 'string',
        columnName: 'countryOpted'
      },
      pcbPercent: {
        type: 'float',
        columnName: 'pcbPercent'
      },
      medCollegeOpted: {
        type: 'string',
        columnName: 'medCollegeOpted'
      },
      passportStatus: {
        type: 'integer',
        columnName: 'passportStatus'
      },
      isActive: {
        type: 'boolean',
        columnName: 'isActive',
        defaultsTo: false
      },
      isProcessed: {
        type: 'boolean',
        columnName: 'isProcessed',
        defaultsTo: false
      },
      isRejected: {
        type: 'boolean',
        columnName: 'isRejected',
        defaultsTo: false
      },
      submitTime: {
        type: 'datetime',
        columnName: 'submitTime'
      },
      /*
      * false - enquiry
      * true - apply
      */
      status: {
        type: 'boolean',
        defaultsTo: false
      }
    }
  };
