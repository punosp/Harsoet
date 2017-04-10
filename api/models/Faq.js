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
    question: {
      type: 'string',
      columnName: 'question'
    },
    answer: {
      type: 'string',
      columnName: 'answer'
    },
    isPublished: {
      type: 'string',
      columnName: 'isPublished',
      defaultsTo: true
    },
    isDeleted: {
      type: 'boolean',
      columnName: 'isDeleted',
      defaultsTo: false
    }
  },
    addFaqs: addFaqs,
    getFaqs: getFaqs,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
    getRecordWithId: getRecordWithId
};

  function addFaqs(data) {
    console.log(data);
    return Q.promise(function (resolve, reject) {
        var fullInfo = {
          question: data.question,
          answer: data.answer
        }
     Faq
      .create(fullInfo)
      .then(function() {
        console.log("Faq#addFaqs :: Data inserted");
        return resolve();
      })
      .catch(function (err) {
        sails.log.error('Faq#addFaqs :: Error querying DB :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
    });
  }

  function getFaqs() {
    return Q.promise(function(resolve, reject) {
      var criteria = {
        isDeleted: false
      }
      Faq
      .find(criteria)
      .then(function(records) {
        return resolve(records);
      })
      .catch(function(err) {
        sails.log.error('Faq#getFaqs :: Error querying DB :: ', err);
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
        question: data.question,
        answer: data.answer
      }

      Faq
      .update(criteria, updatedRecord)
      .then(function(records) {
        return resolve(records[0]);
      })
      .catch(function (err) {
        sails.log.error('Faq#updateRecord :: Error querying DB :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
    });
  }

  function deleteRecord(id) {
    return Q.promise(function (resolve, reject) {
      Faq
      .getRecordWithId(id)
      .then(function(record) {
        var updatedRecord = {
          isDeleted : true
        }
        var criteria = {
          id : id
        }
        return Faq
        .update(criteria, updatedRecord);
      })
      .then(function(records) {
        return resolve();
      })
      .catch(function (err) {
        sails.log.error('Faq#deleteRecord :: Error querying DB :: ', err);
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
          sails.log.error('Faq#getRecordWithId :: Faq id is null');
        return reject({
          code: 400,
          message: 'USER_INVALID_REQUEST'
        });
      }

      var criteria = {
        id : id,
        isDeleted : false
      }
      Faq
      .find(criteria)
      .then(function(records) {
        if(records.length==0) {
          sails.log.error('Faq#getRecordWithId :: No record found');
          return reject({
            code: 500,
            message: 'INTERNAL_SERVER_ERROR'
          });
        }
        return resolve(records[0]);
      })
      .catch(function(err) {
        sails.log.error('Faq#getRecordWithId :: Error querying DB :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      })
    })
  }
