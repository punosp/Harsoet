/* global module */

'use strict';
var nodemailer = require('nodemailer'),
  SENDER_EMAIL = 'sonu.ashutosh8@gmail.com',
  SENDER_PASSWORD = 'prmo0008';



module.exports.mailer = {
  hostName: getHostName(),
  sender: "MyProf<" + SENDER_EMAIL + ">",
  /*
   * Contact account ()
   */
  contactAccount: nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  }),
  /*
   * Hello Account
   */
  helloAccount: nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  })
};

function getHostName() {
  // console.log('Hostname:',process.env.NODE_ENV)
  if(process.env.NODE_ENV === 'development') {
    return "http://localhost:1337"
  } else if(process.env.NODE_ENV === 'production') {
    return "http://35.154.231.94:1337"
  }
  else{
    return "http://localhost:1337";
  }
}
