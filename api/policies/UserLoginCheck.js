/**
 * Created by ashutosh on 20/5/16.
 */
'use strict';

module.exports=function (req, res, next) {

  var form = req.form;
  console.log(req.form.email);
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/login');

  }
  console.log('form is valid');
  return next();

}
