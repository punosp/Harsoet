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
    heading: {
        type: 'string',
        columnName: 'heading'
      },
    description: {
        type: 'string',
        columnName: 'description'
      },
    imageName: {
        type: 'string',
        columnName: 'imageName'
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
  addNews: addNews,
  getNews: getNews,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord,
  getRecordWithId: getRecordWithId
};

function addNews(req) {
  var data = req.form;
  console.log(data);
  return Q.promise(function (resolve, reject) {
  UploadService
    .uploadPic(req)
    .then(function(id) {
      var fullInfo = {
        heading: data.heading,
        description: data.description,
        imageName: id
      }
      return News.create(fullInfo);
    })
    .then(function() {
      console.log("News#addNews :: Data inserted");
      return resolve();
    })
    .catch(function (err) {
      sails.log.error('News#addNews :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}

function getNews() {
  return Q.promise(function(resolve, reject) {
    var criteria = {
      isDeleted: false
    }
    News
    .find(criteria)
    .then(function(records) {
      return resolve(records);
    })
    .catch(function(err) {
      sails.log.error('News#getNews :: Error querying DB :: ', err);
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
      heading: data.heading,
      description: data.description
    }

    News
    .update(criteria, updatedRecord)
    .then(function(records) {
      return resolve(records[0]);
    })
    .catch(function (err) {
      sails.log.error('News#updateRecord :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    });
  });
}

function deleteRecord(criteria) {
  return Q.promise(function (resolve, reject) {
    var updatedRecord = {
      isDeleted : true
    }

    News
    .update(criteria, updatedRecord)
    .then(function(records) {
      return resolve();
    })
    .catch(function (err) {
      sails.log.error('News#deleteRecord :: Error querying DB :: ', err);
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
        sails.log.error('News#getRecordWithId :: News id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }

    var criteria = {
      id : id,
      isDeleted : false
    }
    News
    .find(criteria)
    .then(function(records) {
      if(records.length==0) {
        sails.log.error('News#getRecordWithId :: No record found');
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      }
      return resolve(records[0]);
    })
    .catch(function(err) {
      sails.log.error('News#getRecordWithId :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    })
  })
}

function deleteRecord(id) {
  return Q.promise(function (resolve, reject) {
    News
    .getRecordWithId(id)
    .then(function(record) {
      var updatedRecord = {
        isDeleted : true
      }
      var criteria = {
        id : id
      }
      return News
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
