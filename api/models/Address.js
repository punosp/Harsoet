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
    address: {
        type: 'string',
        columnName: 'address'
      },
    pin: {
        type: 'string',
        columnName: 'pin'
      },
    city: {
        type: 'string',
        columnName: 'city'
      },
    state: {
        type: 'string',
        columnName: 'state'
      },
    country: {
        type: 'string',
        columnName: 'country'
      },
    email: {
        type: 'string',
        columnName: 'email'
      },
    phone: {
        type: 'integer',
        columnName: 'phone'
      },
    from: {
        type: 'string',
        columnName: 'from'
      },
    to: {
        type: 'string',
        columnName: 'to'
      },
    status: {
        type: 'integer',
        columnName: 'status',
        defaultsTo: 0
      }
    },
    addAddress: addAddress,
    createRecord: createRecord
  };

  function addAddress(data) {
    console.log(data);
    var fullAddress;
    return Q.promise(function (resolve, reject) {
      Address
      .find()
      .then(function(details) {
        console.log(details.length);
        if(details.length == 0) {
          fullAddress = {
            address: data.address,
            pin: data.pin,
            city: data.city,
            state: data.state,
            country: data.country,
            email: data.email,
            phone: data.phone,
            from: data.from,
            to: data.to,
            status: 1
          }
        }
        else {
          fullAddress = {
            address: data.address,
            pin: data.pin,
            city: data.city,
            state: data.state,
            country: data.country,
            email: data.email,
            phone: data.phone,
            from: data.from,
            to: data.to
          }
        }
        return Address.createRecord(fullAddress);
      })
      .then(function(record) {
        return resolve(record);
      })
      .catch(function (err) {
        sails.log.error('Company#addDetails :: Error querying DB :: ', err);
        return reject(err);
      });
    });
  }

function updateRecord(criteria, data) {
  return Q.promise(function (resolve, reject) {
    var updatedRecord = {
      about: data.about,
      history: data.history,
      consultantsNo: data.NoOfConsultents,
      ServicesNo: data.NoOfServicesProvided
    }

    Company
    .update(criteria, updatedRecord)
    .then(function(records) {
      return resolve(records[0]);
    })
    .catch(function (err) {
      sails.log.error('Company#updateRecord :: Error querying DB :: ', err);
      return reject(err);
    });
  });
}

function createRecord(data) {
  return Q.promise(function (resolve, reject) {


    Address
    .create(data)
    .then(function(record) {
      return resolve(record);
    })
    .catch(function (err) {
      sails.log.error('Address#createRecord :: Error querying DB :: ', err);
      return reject(err);
    });
  });
}
