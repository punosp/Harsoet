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
      },
    isDeleted: {
      type: 'boolean',
      columnName: 'isDeleted',
      defaultsTo: false
    }
  },
    addAddress: addAddress,
    getAddress: getAddress,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    getRecordWithId: getRecordWithId
};

  function addAddress(data) {
    console.log(data);
    var fullAddress;
    return Q.promise(function (resolve, reject) {
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
            status: data.status
          }
    Address
      .create(fullAddress)
      .then(function(record) {
        return resolve(record);
      })
      .catch(function (err) {
        sails.log.error('Address#addAddress :: Error querying DB :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
    });
  }

  function getAddress() {
    return Q.promise(function(resolve, reject) {
      var criteria = {
        isDeleted: false
      }
      Address
      .find(criteria)
      .then(function(records) {
        return resolve(records);
      })
      .catch(function(err) {
        sails.log.error('Address#getAddress :: Error querying DB :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      })
    });
  }

function updateRecord(id, data) {
  return Q.promise(function (resolve, reject) {
    Address
    .getRecordWithId(id)
    .then(function(res) {
      res.address= data.address;
      res.pin= data.pin;
      res.city= data.cit;
      res.state= data.state;
      res.country= data.country;
      res.email= data.email;
      res.phone= data.phone;
      res.from= data.from;
      res.to= data.to;
      res.status= data.status;
      res
      .save()
          .then(resolve)
          .catch(function (err) {
            sails.log.error('Address#updatedRecord :: save failed');
            return reject({
              code: 500,
              message: 'INTERNAL_SERVER_ERROR'
            });
          });
    })
    .catch(function (err) {
      sails.log.error('Address#updateRecord :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}


function deleteRecord(id) {
  return Q.promise(function (resolve, reject) {
    Address
    .getRecordWithId(id)
    .then(function(record) {
      var updatedRecord = {
        isDeleted : true
      }
      var criteria = {
        id : id
      }
      return Address
      .update(criteria, updatedRecord);
    })
    .then(function(records) {
      return resolve();
    })
    .catch(function (err) {
      sails.log.error('Address#deleteRecord :: Error querying DB :: ', err);
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
        sails.log.error('Address#getRecordWithId :: Address id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }

    var criteria = {
      id : id,
      isDeleted : false
    }
    Address
    .find(criteria)
    .then(function(records) {
      if(records.length==0) {
        sails.log.error('Address#getRecordWithId :: No record found');
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      }
      return resolve(records[0]);
    })
    .catch(function(err) {
      sails.log.error('Address#getRecordWithId :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    })
  })
}
