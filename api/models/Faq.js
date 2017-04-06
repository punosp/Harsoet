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
      }
    },
    addFaqs: addFaqs
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
        return reject(err);
      });
    });
  }
