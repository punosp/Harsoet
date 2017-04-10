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
    post: {
        type: 'string',
        columnName: 'post'
      },
    intro: {
        type: 'string',
        columnName: 'intro'
      },
    imageName: {
        type: 'string',
        columnName: 'imageName'
    },
    isDeleted: {
      type: 'boolean',
      columnName: 'isDeleted',
      defaultsTo: false
    }
  },
  addMember: addMember,
  getTeam: getTeam,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord,
  getRecordWithId: getRecordWithId

  };

  function addMember(req) {
    var data = req.form;
    console.log(data);
    return Q.promise(function (resolve, reject) {
    UploadService
      .uploadPic(req)
      .then(function(id) {
        var fullInfo = {
          name: data.name,
          post: data.position,
          intro: data.description,
          imageName: id
        }
        return Team.create(fullInfo);
      })
      .then(function() {
        console.log("Team#addMember :: Data inserted");
        return resolve();
      })
      .catch(function (err) {
        sails.log.error('Team#addMember :: Error querying DB :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });
}

function getTeam() {
  return Q.promise(function(resolve, reject) {
    var criteria = {
      isDeleted: false
    }
    Team
    .find(criteria)
    .then(function(records) {
      return resolve(records);
    })
    .catch(function(err) {
      sails.log.error('Team#getTeam :: Error querying DB :: ', err);
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
      post: data.position,
      intro: data.description
    }

    Team
    .update(criteria, updatedRecord)
    .then(function(records) {
      return resolve(records[0]);
    })
    .catch(function (err) {
      sails.log.error('Team#updateRecord :: Error querying DB :: ', err);
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

    Team
    .update(criteria, updatedRecord)
    .then(function(records) {
      return resolve();
    })
    .catch(function (err) {
      sails.log.error('Team#deleteRecord :: Error querying DB :: ', err);
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
        sails.log.error('Team#getRecordWithId :: Team id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }

    var criteria = {
      id : id,
      isDeleted : false
    }
    Team
    .find(criteria)
    .then(function(records) {
      if(records.length==0) {
        sails.log.error('Team#getRecordWithId :: No record found');
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      }
      return resolve(records[0]);
    })
    .catch(function(err) {
      sails.log.error('Team#getRecordWithId :: Error querying DB :: ', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    })
  })
}

function deleteRecord(id) {
  return Q.promise(function (resolve, reject) {
    Team
    .getRecordWithId(id)
    .then(function(record) {
      var updatedRecord = {
        isDeleted : true
      }
      var criteria = {
        id : id
      }
      return Team
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
