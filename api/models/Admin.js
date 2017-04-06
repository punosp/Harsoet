/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
 'use strict';

 var Q = require('q'),
   _ = require('lodash'),
   uuid = require('node-uuid'),
   md5 = require('md5'),
   crypto = require('crypto');
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
  isActive: {
    type: 'boolean',
    columnName: 'isActive',
    defaultsTo: true
  },
  isDeleted: {
    type: 'boolean',
    columnName: 'isDeleted',
    defaultsTo: false
  },
  role: {
    model: 'Role'
  },
  lastLoggedIn: {
    type: 'datetime',
    columnName: 'lastLoggedIn'
  },
  isLoggedIn: {
    type: 'boolean',
    columnName: 'isLoggedIn',
    defaultsTo: false
  },

    toResetPassword: toResetPassword
  },
  loadAdminByEmail: loadAdminByEmail,
  forgotPasswordInit: forgotPasswordInit,
  resetPasswordInit: resetPasswordInit,
  resetPasswordUpdate: resetPasswordUpdate,
  updatePassword: updatePassword,
  getForEmailPasswordV2: getForEmailPasswordV2,
  registerSubAdminByAdmin: registerSubAdminByAdmin,
  createSubAdminByAdmin: createSubAdminByAdmin,
  updateSubAdminByAdmin: updateSubAdminByAdmin,
  getAdminForId: getAdminForId,
  getAllAdmins: getAllAdmins,
  removeSubAdminByAdmin: removeSubAdminByAdmin,
  removeSubAdmin: removeSubAdmin


};


function toResetPassword() {
  var user = this.toObject();

  return {
    name: user.name,
    email: user.email,
    uniqueKey: user.systemUniqueKey,
    id: user.id
  };
}







function loadAdminByEmail(email) {
  return Q.promise(function (resolve, reject) {
    var criteria = {
      email: email,
      isDeleted: false,
      isActive: true
    };
    Admin
      .findOne(criteria)
      /**
       * user = {
       * name:
       * email:
       * password:
       * role: {
       * name:
       * isDeleted:
       *
       * }
       * }
       */
      .populate("role")
      .then(function (user) {
        if (!user) {
          sails.log.silly('Admin#loadAdminByEmail :: No user available for the given email :: ', email);
          return resolve(null);
        }
        return resolve(user);
      })
      .catch(function (err) {
        sails.log.error('Admin#loadAdminByEmail :: Error querying DB :: ', err);
        return reject(err);
      });
  });
}

function __generateSalt() {
  return md5(uuid.v1());
}

function __generateUuid() {
  return __generateSalt();
}

function __generateEncryptedPassword(password, salt) {
  return Q.promise(function (resolve, reject) {
    crypto.pbkdf2(password, salt, 10, 512, 'sha512', function (err, encrypted) {
      if (err) {
        sails.log.error('Admin#__generateEncryptedPassword :: ', err);
        return reject(err);
      }

      return resolve(encrypted.toString('hex'));
    });
  });
}




function forgotPasswordInit(email) {
  return Q.promise(function (resolve, reject) {
    // check for email id
    if (!email) {
      // throw error
      return reject({
        code: 422,
        message: {
          email: ['FORGOTPASSWORD_EMAIL_REQUIRED']
        }
      });
    }
    // load user with email id
    Admin
      .loadAdminByEmail(email)
      .then(function (user) {
        // check for user
        if (!user) {
          // user not found for the given criteria
          return reject({
            code: 404,
            message: 'FORGOTPASSWORD_USER_NOT_FOUND'
          });
        }
        // generate a system unique key
        user.systemUniqueKey = __generateUuid();
        // update user with new system unique key
        user
          .save(function(err) {
            if(err) {
              sails.log.error('Admin#forgotPasswordInit :: Error in updating user ::', err);
              return reject({
                code: 500,
                message: 'INTERNAL_SERVER_ERROR'
              });
            }
            // send reset instructions
            var userObject = {
              uniqueKey: user.systemUniqueKey,
              email: user.email,
              name: user.name
            };

            // send password instructions mail to user
            EmailService
              .sendResetPasswordEmail(userObject);

            return resolve();
          })

      })
      .catch(function (err) {
        sails.log.error('Admin#forgotPasswordInit :: Error in finding user ::', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });

}

function resetPasswordInit(email, uniqueKey) {
  return Q.promise(function (resolve, reject) {
    // check if email or unique key exists in the request
    if (!email || !uniqueKey) {
      sails.log.error('Admin#resetPassword :: Reset password request invalid :: ' +
        'Email or UniqueKey not present');
      // reject
      return reject({
        code: 400,
        message: 'RESETPASSWORD_INVALID_REQUEST'
      });
    }
    // load the user for criteria
    var criteria = {
      email: email,
      systemUniqueKey: uniqueKey,
      isDeleted: false,
      isActive: true
    };

    Admin
      .findOne(criteria)
      .then(function (user) {
        // check for user
        if (!user) {
          return reject({
            code: 404,
            message: 'RESETPASSWORD_USER_NOT_FOUND'
          });
        }

        return resolve(user.toResetPassword());
      })
      .catch(function (err) {
        sails.log.error('Admin#resetPassword :: error in finding user :: ', err);

        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });

}

function resetPasswordUpdate(user, newPassword) {
  return Q.promise(function (resolve, reject) {
    // update user with new password

    var criteria = {
        id: user.id
      },
      salt = __generateSalt();

    __generateEncryptedPassword(newPassword, salt)
      .then(function (encryptedPassword) {
        // generate updated values
        var update = {
          salt: salt,
          password: encryptedPassword,
          isMailOrSmsVerified: true,
          isActive: true,
          systemUniqueKey: null
        };

        return Admin.update(criteria, update);
      })
      .then(function (_user) {
        if (!_user || !_user[0]) {
          // return server error
          sails.log.error('Admin#requestPasswordUpdate :: Admin update query null');
          return reject({
            code: 500,
            message: 'INTERNAL_SERVER_ERROR'
          });
        }

        var user = _user[0],
          userObject = {
            name: user.name,
            email: user.email,
            updatedAt: user.updatedAt
          };
        /**
         * Disabled for client confirmation
         // send an email to user for successful password reset
         EmailService
         .sendResetPasswordConfirmationMail(userObject);
         */
        // return resolve
        return resolve();
      })
      .catch(function (err) {
        // throw system error
        sails.log.error('Admin#requestPasswordUpdate :: Error :: ', err);
        return reject({
          code: 500,
          message: 'INTERNA_SERVER_ERROR'
        });
      });
  });
}

function getAdminForId(userId) {
  return Q.promise(function (resolve, reject) {
    if (!userId) {
      sails.log.error('Admin#getAdminForId :: Admin id is null');
      return reject({
        code: 400,
        message: 'USER_INVALID_REQUEST'
      });
    }
    // criteria to load active user
    var criteria = {
      id: userId,
      isActive: true,
      isDeleted: false
    };
    Admin
      .findOne(criteria)
      .populate('role')
      .then(function (user) {
        if (!user) {
          return reject({
            code: 404,
            message: 'USER_NOT_FOUND'
          });
        } else {
          // convert the user
          return resolve(user);
        }
      })
      .catch(function (err) {
        // caught the error
        sails.log.error('Admin#getAdminForId :: Error in query :: ', err);

        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });
}

/**
 * Updates user password while checking the old password is correct
 *
 * @param data
 *
 * data : {
 *  oldPassword: 'xxxxxxx',
 *  newPassword: 'xxxxxx'
 * }
 *
 */
function updatePassword(data, user) {
  return Q.promise(function (resolve, reject) {
    if (!data || !user) {
      sails.log.error('Admin#updatePassword :: Error null data or user');
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    }
    // check and update user password
    var currentPassword = user.password,
      currentSalt = user.salt,
      oldPassword = data.oldPassword,
      newPassword = data.newPassword,
      newSalt = __generateSalt();
    // generate encrypted password with salt and check equality
    __generateEncryptedPassword(oldPassword, currentSalt)
      .then(function (oldEncryptedPassword) {
        if (currentPassword !== oldEncryptedPassword) {
          // send a validation error
          return reject({
            code: 422,
            message: {
              oldPassword: ['Enter correct Old Password']
            }
          });
        }
        // if correct; update the new password
        __generateEncryptedPassword(newPassword, newSalt)
          .then(function (newEncryptedPassword) {
            // update user
            user.salt = newSalt;
            user.password = newEncryptedPassword;

            return user.save();
          })
          .then(resolve)
          .catch(function (err) {
            sails.log.error('Admin#updatePassword :: Error updating new password :: ', err);
            return reject({
              code: 500,
              message: 'INTERNAL_SERVER_ERROR'
            });
          });
      })
      .catch(function (err) {
        sails.log.error('Admin#updatePassword :: Error :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });


  });
}

function getForEmailPasswordV2(data) {
  return Q.promise(function (resolve, reject) {
    // validate the fields
    if (!data) {
      sails.log.verbose('Admin#getForEmailPasswordV2 :: data null');
      return reject({
        code: 500,
        message: 'INTERNAL_SERVER_ERROR'
      });
    }
    // get the user for mail
    Admin
      .loadAdminByEmail(data.email)
      .then(function (user) {
        if (!user) {
          sails.log.info('Admin#getForEmailPasswordV2 :: No user available for the given email :: ', data.email);
          // send response with user not found
          return reject({
            code: 404,
            message: 'LOGIN_USER_NOT_FOUND'
          });
        }
        // check for isMailOrSmsVerified
        if (!user.isMailOrSmsVerified) {
          sails.log.info('Admin#getForEmailPasswordV2 :: Admin not verified email');
          // send response with user not found
          return reject({
            code: 403,
            message: 'LOGIN_USER_EMAIL_NOT_VERIFIED'
          });
        }
        // if found check the password matching
        var salt = user.salt || "";
        // get encrypted password
        __generateEncryptedPassword(data.password, salt)
          .then(function (hashedPassword) {
            // check if passwords match
            if (hashedPassword !== user.password) {
              return reject({
                code: 403,
                message: 'LOGIN_USER_INVALID_CREDENTIALS'
              });
            }
            // update user with last logged in
            user.lastLoggedin = new Date();
            user.isLoggedIn = true;
            user.save(function () {
            });

            return resolve(user);
          });
      })
      .catch(function (err) {
        sails.log.error('Admin#getForEmailPassword :: Error :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });
}

/**
 * function responsible for creating or loading a user for login
 *
 * @param data
 *
 * data = {
 *  firstName:
 *  lastName:
 *  emailAddress:
 *  formattedName:
 *  linkedInId:
 *  industry:
 *  location:
 *  pictureUrl:
 *  positions:
 *  user:
 *  publicProfileUrl:
 * }
 *
 */


function registerSubAdminByAdmin(data) {

  return Q.promise(function (resolve, reject) {
    // check if user is already registered
    Admin
      .loadAdminByEmail(data.email)
      .then(function (user) {
        if (user) {
          return reject({
            code: 422,
            message: {
              email: ['REGISTRATION_USER_ALREADY_EXISTS']
            }
          });
        } else {
          // register new user in the database
          Admin
            .createSubAdminByAdmin(data)
            .then(function (user) {
              // create a default stacks and tags.handlebars

              return resolve(user);
            })
            .catch(function (err) {
              sails.log.error('Admin#registerAdminV2 :: Error while registering user :: ', err);

              return reject({
                code: 500,
                message: 'INTERNAL_SERVER_ERROR'
              });
            });
        }
      })
      .catch(function (err) {
        sails.log.error('Admin#registerAdminV2 :: Error while registering user :: ', err);
        return reject({
          code: 500,
          message: 'INTERNAL_SERVER_ERROR'
        });
      });
  });

}


function createSubAdminByAdmin(userData) {
  return Q.promise(function (resolve, reject) {
    var newAdmin = {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: null,
        salt: null,
        isLoggedin: true,
        lastLoggedin: new Date(),
        systemUniqueKey: null,
        isMailOrSmsVerified: true

      },
      salt = __generateSalt();
    __generateEncryptedPassword(userData.password, salt)
      .then(function (encryptedPassword) {
        // updating new user object
        newAdmin.password = encryptedPassword;
        newAdmin.salt = salt;
        // create profile for the user
        // create new user
        // check for role
        return Role.getRoleByName(userData.role);
      })
      .then(function(role) {
        newAdmin.role = role.id;
        return Admin.create(newAdmin);
      })
      .then(function (user) {
        // create new profile
        return resolve(user);
      })
      .catch(function (err) {
        sails.log.error('Admin#createNewAdminByAdmin :: Error while creating a new user :: ', err);
        return reject(err);
      });
  });

}



function updateSubAdminByAdmin(userData,id) {
  return Q.promise(function (resolve, reject) {
    var updateAdmin = {
        name: userData.name,
        password: null,
        salt: null,
        isLoggedin: true,
        lastLoggedin: new Date(),
        systemUniqueKey: null,
        isMailOrSmsVerified: true

      },
      salt = __generateSalt();
    __generateEncryptedPassword(userData.password, salt)
      .then(function (encryptedPassword) {
        // updating new user object
        updateAdmin.password = encryptedPassword;
        updateAdmin.salt = salt;
        // create profile for the user
        // create new user
        // check for role
        return Role.getRoleByName(userData.role);
      })
      .then(function(role) {
        updateAdmin.role = role.id;
        return Admin.update(id, updateAdmin);
      })
      .then(function(users) {
        // do other tasks with new admin
        return resolve(users);
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#updateAdmin:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}




function getAllAdmins() {
  return Q.promise(function(resolve, reject) {
    Admin
      .find()
      .populate('role')
      // success block
      .then(function(users) {
        // do other tasks with new admin
        return resolve(users);
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#getAllAdmins:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}

function removeSubAdminByAdmin(id,guser) {

  return Q.promise(function(resolve, reject) {
    Admin
      .getAdminForId(id)
      .then(function(user) {
        if (user.id == guser.id) {
          return reject({
            code: 422,
            message: "Cannot delete your self"
          });
        }
        return Admin
          .removeSubAdmin(user.id);


      })
      .then(resolve)

      /**
       * err = {
     *   code: ""
     *   message: ""
     * }
       */
      .catch(function(err) {
        sails.log.error("user#removeAdminByAdmin:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });

  });



}

function removeSubAdmin(id) {
  return Q.promise(function(resolve, reject) {
    Admin
      .destroy(id)
      // success block
      .then(function() {
        // do other tasks with new admin
        return resolve();
      })
      // error block
      .catch(function(err) {
        sails.log.error("Admin#removeAdmin:: Error :: ", err);

        return reject({
          code: 500,
          message: "Internal Server Error"
        });
      });
  });

}
