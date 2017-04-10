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
    about: {
        type: 'string',
        columnName: 'about'
      },
    history: {
        type: 'string',
        columnName: 'history'
      },
    consultantsNo: {
        type: 'integer',
        columnName: 'consultantsNo'
      },
    ServicesNo: {
        type: 'integer',
        columnName: 'ServicesNo'
      }
    },
    addDetails: addDetails,
    updateRecord: updateRecord,
    createRecord: createRecord,
    getRecord: getRecord
  };

  function addDetails(data) {
    console.log(data);
    return Q.promise(function (resolve, reject) {
      Company
      .find()
      .then(function(details) {
        if(details.length == 1) {
          console.log("update");
          return Company.updateRecord(details[0], data);
        }
        return Company.createRecord(data);
      })
      .then(function(record) {
        return resolve(record);
      })
      .catch(function (err) {
        sails.log.error('Company#addDetails :: Error querying DB :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
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
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}

function createRecord(data) {
  return Q.promise(function (resolve, reject) {
    var createdRecord = {
      about: data.about,
      history: data.history,
      consultantsNo: data.NoOfConsultents,
      ServicesNo: data.NoOfServicesProvided
    }

    Company
    .create(createdRecord)
    .then(function(record) {
      return resolve(record);
    })
    .catch(function (err) {
      sails.log.error('Company#createRecord :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}

function getRecord() {
  return Q.promise(function(resolve, reject) {
    Company
    .find()
    .then(function(records) {
      return resolve(records);
    })
    .catch(function(err) {
      sails.log.error('Company#getRecord :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    })
  });
}
