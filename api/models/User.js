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
      email: {
        type: 'string',
        columnName: 'email',
        unique: true
      },
      phone: {
        type: 'integer',
        columnName: 'phone'
      },
      message: {
        type: 'string',
        columnName: 'message'
      },
      passYear: {
        type: 'integer',
        columnName: 'passYear'
      },
      countryOpted: {
        type: 'string',
        columnName: 'countryOpted'
      },
      pcbPercent: {
        type: 'float',
        columnName: 'pcbPercent'
      },
      medCollegeOpted: {
        type: 'string',
        columnName: 'medCollegeOpted'
      },
      passportStatus: {
        type: 'integer',
        columnName: 'passportStatus'
      },
      isActive: {
        type: 'boolean',
        columnName: 'isActive',
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
      submitTime: {
        type: 'datetime',
        columnName: 'submitTime'
      },
      /*
      * false - enquiry
      * true - apply
      */
      status: {
        type: 'boolean',
        defaultsTo: false
      }
    },
    partialData: partialData
  };

  function partialData(req, res) {
    return Q.promise(function (resolve, reject) {

      var addresses, updates, team;
    Address
    .getAddress()
    .then(function(add) {
      addresses = add;
      return News.getNews();
    })
    .then(function(news) {
      updates = news;
      return Team.getTeam();
    })
    .then(function(teamMembers) {
      team = teamMembers;
      var selectedUpdates=[], selectedTeam=[], primaryAddress, secondaryAddresses=[], threeUpdates=[];
      var count = 0;
      _.forEach(updates, function(value) {
        selectedUpdates.push(value);
        if(count < 3) {
          threeUpdates.push(value);
        }
        count++;

        if(count==6) {
          return false;
        }
      })
      count =0;
      _.forEach(team, function(value) {
        selectedTeam.push(value);
        count++;
        if(count==6) {
          return false;
        }
      })
      count=0;
      _.forEach(addresses, function(value) {
        if(value.status == 1 && count==0) {
          primaryAddress = value;
          count++;
        }
        else {
          secondaryAddresses.push(value);
        }
      })
      var pData = {
        primaryAddress : primaryAddress,
        addresses : secondaryAddresses,
        updates : selectedUpdates,
        threeUpdates: threeUpdates,
        team : selectedTeam
      }
      return resolve(pData);
    })
    .catch(function (err) {
      sails.log.error('User#partialData :: Error ::', err);
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      })
    })
  });
}
