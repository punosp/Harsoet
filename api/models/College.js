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
        columnName: 'about'
      },
    country: {
        type: 'string',
        columnName: 'history'
      },
    city: {
        type: 'string',
        columnName: 'consultantsNo'
      },
    established: {
        type: 'integer',
        columnName: 'ServicesNo'
      },
    fee: {
        type: 'integer',
        columnName: 'fee'
      },
    details: {
        type: 'string',
        columnName: 'details'
      },
    isDeleted: {
        type: 'boolean',
        columnName: 'isDeleted',
        defaultsTo: false
    }
  },
  addCollege: addCollege,
  getColleges: getColleges,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord,
  getRecordWithId: getRecordWithId
};

function addCollege(data) {
  console.log(data);
  return Q.promise(function (resolve, reject) {
      var fullInfo = {
        name: data.name,
        country: data.country,
        city: data.city,
        established: data.established,
        fee: data.fee,
        details: data.details
      }
   College
    .create(fullInfo)
    .then(function() {
      console.log("College#addCollege :: Data inserted");
      return resolve();
    })
    .catch(function (err) {
      sails.log.error('College#addCollege :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}

function getColleges() {
  return Q.promise(function(resolve, reject) {
    var criteria = {
      isDeleted: false
    }
    College
    .find(criteria)
    .then(function(records) {
      return resolve(records);
    })
    .catch(function(err) {
      sails.log.error('College#getColleges :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    })
  });
}

function updateRecord(criteria, data) {
  return Q.promise(function (resolve, reject) {
    var updatedRecord = {
    name: data.name,
    country: data.country,
    city: data.city,
    established: data.established,
    fee: data.fee,
    details: data.details
    }

    College
    .update(criteria, updatedRecord)
    .then(function(records) {
      return resolve(records[0]);
    })
    .catch(function (err) {
      sails.log.error('College#updateRecord :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}

function deleteRecord(id) {
  return Q.promise(function (resolve, reject) {
    console.log(id);
    College
    .getRecordWithId(id)
    .then(function(record) {
      var updatedRecord = {
        isDeleted : true
      }
      console.log(record);
      var criteria = {
        id : id
      }
      return College
      .update(criteria, updatedRecord);
    })
    .then(function(records) {
      return resolve();
    })
    .catch(function (err) {
      sails.log.error('College#deleteRecord :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}

function getRecordWithId(id) {
  return Q.promise(function(resolve, reject) {
      if (!id) {
        sails.log.error('College#getRecordWithId :: College id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }

    var criteria = {
      id : id,
      isDeleted : false
    }
    College
    .find(criteria)
    .then(function(records) {
      if(records.length==0) {
        sails.log.error('College#getRecordWithId :: No record found');
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      }
      return resolve(records[0]);
    })
    .catch(function(err) {
      sails.log.error('College#getRecordWithId :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    })
  })
}
