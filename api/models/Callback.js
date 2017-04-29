/**
 * Callback.js
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
       type: 'string',
       columnName: 'phone'
     },
     subject: {
       type: 'string',
       columnName: 'subject'
     },
     isSeen: {
       type: 'boolean',
       columnName: 'isSeen',
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
     isDeleted: {
       type: 'boolean',
       columnName: 'isDeleted',
       defaultsTo: false
     }
     },
     addCallback: addCallback,
     getAllCallback: getAllCallback,
     deleteRecord: deleteRecord,
     getRecordWithId: getRecordWithId
   };

   function addCallback(data) {
     return Q.promise(function (resolve, reject) {
       var app = {
         name: data.name,
         email: data.email,
         phone: data.phone,
         subject: data.subject
       }

       Callback
       .create(app)
       .then(function(result) {
         return resolve(result);
       })
       .catch(function (err) {
         sails.log.error('Callback#addCallback :: Error ::', err);
         return reject({
           code: 500,
           message: 'INTERNAL_SERVER_ERROR'
         })
       })

     });
   }



     function getAllCallback() {
       return Q.promise(function(resolve, reject) {
         var criteria = {
           isDeleted: false
         }
         var updatedAtSortCriteria = {
           "updatedAt": -1
         };
         Callback
         .find(criteria)
         .sort(updatedAtSortCriteria)
         .then(function(records) {
           return resolve(records);
         })
         .catch(function(err) {
           sails.log.error('Callback#getAllCallback :: Error querying DB :: ', err);
           return reject({
             code: 500,
             message: 'INTERNAL_SERVER_ERROR'
           });
         })
       });
     }

     function deleteRecord(id) {
       return Q.promise(function (resolve, reject) {
         console.log(id);
         Callback
         .getRecordWithId(id)
         .then(function(record) {
           var updatedRecord = {
             isDeleted : true
           }
           console.log(record);
           var criteria = {
             id : id
           }
           return Callback
           .update(criteria, updatedRecord);
         })
         .then(function(records) {
           return resolve();
         })
         .catch(function (err) {
           sails.log.error('Callback#deleteRecord :: Error querying DB :: ', err);
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
             sails.log.error('Application#getRecordWithId :: College id is null');
           return reject({
             code: 400,
             message: 'USER_INVALID_REQUEST'
           });
         }

         var criteria = {
           id : id,
           isDeleted : false
         }
         Callback
         .find(criteria)
         .then(function(records) {
           if(records.length==0) {
             sails.log.error('Callback#getRecordWithId :: No record found');
             return reject({
               code: 500,
               message: 'INTERNAL_SERVER_ERROR'
             });
           }
           return resolve(records[0]);
         })
         .catch(function(err) {
           sails.log.error('Callback#getRecordWithId :: Error querying DB :: ', err);
           return reject({
             code: 500,
             message: 'INTERNAL_SERVER_ERROR'
           });
         })
       })
     }
