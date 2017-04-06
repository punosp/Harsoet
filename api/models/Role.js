/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Q = require('q')
module.exports = {
  attributes: {
    name: 'string',
    // Add a reference to Users
    admins: {
      collection: 'Admin',
      via: 'role'
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  getRoleByName: getRoleByName
};

function getRoleByName(name) {
  return Q.promise(function(resolve,reject) {
    var criteria = {
      name: name,
      isDeleted: false
    };

    Role
      .findOne(criteria)
      .then(function(role) {
        if(!role) {
          return reject({
            code: 404,
            message:'ROLE_NOT_FOUND'
          });


        }
        return resolve(role);
      })
      .catch(function(err) {
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      })
  });
}
