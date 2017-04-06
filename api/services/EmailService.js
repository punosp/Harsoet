/* global module, sails */

'use strict';

var mailerConfig = sails.config.mailer;

module.exports = {
  sendResetPasswordEmail: sendResetPasswordEmail,
  sendResetPasswordConfirmationMail: sendResetPasswordConfirmationMail,
  dummy: function() {
    console.log("Printer in dummy");
  }
};


function sendResetPasswordEmail(user) {
  // construct route
  var hostName = mailerConfig.hostName,
    resetPasswordLink = hostName + '/admin/' + encodeURIComponent(user.email) + '/resetPassword/' + user.uniqueKey;

  sails.renderView('emailTemplates/resetPassword', {
    layout: false,
    link: resetPasswordLink
  }, function (err, view) {
    if (err) {
      sails.log.error('Email template rendering error', err);
    } else {
      // Change all the values to configurable options
      // Log messages
      var mailOptions = {
          from: mailerConfig.sender,
          to: user.email,
          subject: 'Request for reset password',
          html: view
        },
        mailer = mailerConfig.contactAccount;

      // send mail with defined transport object
      mailer.sendMail(mailOptions, function (error, info) {
        if (error) {
          sails.log.error('Mailer error', error);
        }
        sails.log.info('Message sent: ', info);
      });
    }
  });

  return;
}

function sendResetPasswordConfirmationMail(user) {
  // send a success mail to the user
  // construct route
  // Change all the values to configurable options
  // Log messages
  var mailOptions = {
      from: mailerConfig.sender,
      to: user.email,
      subject: 'Password updated',
      text: 'Hello ' + user.name + '; Your account password has been successfully updated.'
    },
    mailer = mailerConfig.contactAccount;

  // send mail with defined transport object
  mailer.sendMail(mailOptions, function (error, info) {
    if (error) {
      sails.log.error('Mailer error', error);
    }
    sails.log.info('Message sent: ', info);
  });

  return;
}
