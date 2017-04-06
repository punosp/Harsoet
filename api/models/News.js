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
    imagePath: {
        type: 'string',
        columnName: 'imagePath'
      },
    isPublished: {
        type: 'string',
        columnName: 'isPublished',
        defaultsTo: true
    }
  },
  addNews: addNews
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
        description: data.description
      }
      return News.create(fullInfo);
    })
    .then(function() {
      console.log("News#addNews :: Data inserted");
      return resolve();
    })
    .catch(function (err) {
      sails.log.error('News#addNews :: Error querying DB :: ', err);
      return reject(err);
    });
  });
}
