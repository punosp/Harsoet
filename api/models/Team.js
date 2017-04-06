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
    }
  },
  addMember: addMember

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
        return reject(err);
      });
  });
}

  // Answer
  // .create(answer)
  // .then(function (savedAnswer) {
  //   return resolve(savedAnswer);
  // })
  // .catch(function (err) {
  //   sails.log.error('Answer#createAnswerEntity :: saving response failed :: ', err);
  //
  //   return reject({
  //     code: 500,
  //     message: 'INTERNAL_SERVER_ERROR'
  //   });
  // })
