/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
module.exports = {


  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  dashBoard : dashBoardAction,
  login : loginAction,
	loginSubmit : loginSubmitAction,
	logout : logoutAction,
  forgotPassword: forgotPasswordAction,
  resetPassword: resetPasswordAction,
  resetPasswordSubmit: resetPasswordSubmitAction,
  changePassword: changePasswordAction,
  enterForgotPassword: enterForgotPasswordAction,
  enterChangedPassword: enterChangedPasswordAction,
  errorPage: errorPageAction,

  companyNews: companyNewsAction,
  companyFaqs: companyFaqsAction,
  aboutCompany: aboutCompanyAction,
  companyAddress: companyAddressAction,
  team: teamAction,
  college: collegeAction,

  companyNewsAdd: companyNewsAddAction,
  companyFaqsAdd: companyFaqsAddAction,
  companyAddressAdd: companyAddressAddAction,
  teamAdd: teamAddAction,
  collegeAdd: collegeAddAction,


  addTeamMember: addTeamMemberAction,
  addCompanyNews: addCompanyNewsAction,
  addCompanyFaqs: addCompanyFaqsAction,
  addCompanyAddress: addCompanyAddressAction,
  aboutCompanyAdd: aboutCompanyAddAction,
  addCollege: addCollegeAction,

  aboutCompanyEdit: aboutCompanyEditAction,
  teamEdit: teamEditAction,
  companyNewsEdit: companyNewsEditAction,
  companyFaqsEdit: companyFaqsEditAction,
  companyAddressEdit: companyAddressEditAction,
  collegeEdit: collegeEditAction,

  teamUpdate: teamUpdateAction,
  companyNewsUpdate: companyNewsUpdateAction,
  companyFaqsUpdate: companyFaqsUpdateAction,
  companyAddressUpdate: companyAddressUpdateAction,
  collegeUpdate: collegeUpdateAction,

  companyAddressDelete: companyAddressDeleteAction,
  companyFaqDelete: companyFaqDeleteAction,
  companyNewsDelete: companyNewsDeleteAction,
  companyTeamDelete: companyTeamDeleteAction,
  collegeDelete: collegeDeleteAction,

  getQuery: getQueryAction,
  deleteQuery: deleteQueryAction,
  getCallback: getCallbackAction,
  deleteCallback: deleteCallbackAction,
  getApplication: getApplicationAction,
  deleteApp : deleteAppAction

}

function dashBoardAction(req, res) {
  /*var countUser=0,countQuestion=0,countTag=0;
  User
    .getCountUser()
    .then(function (count) {
      countUser = count;
      return Question
        .getCountQuestion()

    })
    .then(function (count) {
      countQuestion = count;
      return Tags
        .getCountTag()

    })
    .then(function (count) {
      countTag = count;*/
      res.view("admin/dashBoard", {
        message: req.flash("message"),
        errors: req.flash("errors"),
        layout: 'adminLayout'
      });

    /*})
    .catch(function (err) {
      console.log('dashBoard ::',err);
    })

*/

}
function loginAction(req, res) {
  if(req.user)
  {
    if(req.user.role.name == 'ROLE_ADMIN')
    {
      res.redirect('/admin/dashBoard');
    }
  }
  else {
    res.view("admin/login", {
      alert: req.flash("alert"),
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'loginLayout'
    });
  }
}

function loginSubmitAction(req, res) {

  if (req.user.role.name == 'ROLE_ADMIN') {
    return res.redirect('/admin/dashBoard');
  }
  else
  {
    req.logout();
    res.redirect('/admin/login');
  }
}

function logoutAction(req, res) {

  req.logout();
  req.flash("message", 'Successfully logged out!');
  res.redirect('/admin/login');
}


function forgotPasswordAction(req, res) {
  // get the user mail id from the form
  var form = req.form;
  console.log(req.form.email);
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/forgotPassword');

  }
  // load the user for mail id and send a reset instructions mail
  Admin
    .forgotPasswordInit(req.form.email)
    .then(function () {
      // send success response
      req.flash("alert", "Password Reset Instructions has been sent to your email id");

      return res.redirect('/admin/login');
    })
    .catch(function (err) {
      sails.log.error('AdminController#forgotPasswordAction :: Error ::', err);

      // check for the error code and accordingly send the response
      var errors = err.message;

      req.flash("errors", errors);

      return res.redirect('/admin/forgotPassword');
    });
}

/**
 * Reset password request from a mail,
 * Returns a web view that displays a form; asking for the new password
 *
 * @param req - Request Object
 * @param res - Response Object
 * @param email - Email of the user
 * @param uniqueKey - Unique key for the reset password request
 *
 */
function resetPasswordAction(req, res) {
  // get the email and unique key and validate
  var email = req.param('email'),
    uniqueKey = req.param('uniqueKey');
  req.logout();
  // validate the email and unique key
  Admin
    .resetPasswordInit(email, uniqueKey)
    .then(function (user) {
      // form with unique key
      // create a form and render the view
       res.view('admin/forgotPasswordReset', {
        message: req.flash("message"),
        user: user,
        errors: req.flash('errors'),
        layout: 'loginLayout'
      });
    })
    .catch(function (err) {
      sails.log.error('AdminController#resetPasswordAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.send("error")
    });
}

function resetPasswordSubmitAction(req, res) {
  // get the email and unique key and validate
  var email = req.param('email'),
    uniqueKey = req.param('uniqueKey');
  req.logout();

  // validate the email and unique key
  Admin
    .resetPasswordInit(email, uniqueKey)
    .then(function (user) {
      // check if the form is valid
      if (!req.form.isValid) {
        // not valid; throw an error with flash messages
        var flashMessages = ValidationService
          .getFormFlashMessages(req.form.getErrors());
        _.forEach(flashMessages, function (message) {
          req.flash('errors', message);
        });

        return res.redirect('/admin/'+email+'/resetPassword/'+uniqueKey);
      }
      var newPassword = req.form.newPassword;
      // update user password and send email
      if(req.form.newPassword!==req.form.confirmPassword)
      {
        req.flash('errors','New and Confirm password do not match');
        return res.redirect('/admin/'+email+'/resetPassword/'+uniqueKey);
      }
      Admin
        .resetPasswordUpdate(user, newPassword)
        .then(function () {
          // return with success
          res.render('admin/newPasswordSuccess',{
            message: req.flash("message"),
            errors: req.flash("errors"),
            layout: 'loginLayout'

          });
        })
        .catch(function (err) {
          // log the error
          sails.log.error('AdminController#resetPasswordSubmitAction :: Error Updating user :: ', err);
          // check for the error code and accordingly send the response
          req.flash('errors',err);
          return res.redirect('/admin/'+email+'/resetPassword/'+uniqueKey);
        });
    })
    .catch(function (err) {
      sails.log.error('AdminController#resetPasswordSubmitAction :: Error ::', err);

      // check for the error code and accordingly send the response
      req.flash('errors',err);
      return res.redirect('/admin/'+email+'/resetPassword/'+uniqueKey);
    });
}

/**
 * Updates user password with new one, if all fields are validated
 *
 * @param req
 * @param res
 */
function changePasswordAction(req, res) {
  // check if form is valid
  var form = req.form;
console.log("inside changepassword action");
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/changePassword');

  }
  // update password
  Admin
    .updatePassword(req.form, req.user)
    .then(function () {
      req.flash("message",'password successfully changed');
      return res.redirect('/admin/dashBoard');
    })
    .catch(function (err) {
      sails.log.error('AdminController#changePasswordAction :: Updating user password error :: ', err);
      // check for the error code and accordingly send the response

      var errors = err.message.oldPassword;

      req.flash("errors", errors);
      return res.redirect('/admin/changePassword');
    });
}

function enterForgotPasswordAction(req, res) {

  res.view("admin/forgotPassword", {
    message: req.flash("message"),
    errors: req.flash("errors"),
    layout: 'loginLayout'
  });

}

function enterChangedPasswordAction(req, res) {

  if(req.user) {
    if (req.user.role.name == 'ROLE_ADMIN') {
      res.view("admin/changePassword", {
        message: req.flash("message"),
        errors: req.flash("errors"),
        layout: 'loginLayout'
      });
    }
}
}



function errorPageAction(req, res) {
  var code = req.param('code');
  if(code === '500') {
    res.view("500", {
      layout: 'loginLayout'
    });
  }
  else if(code === '404') {
    res.view("404", {
      layout: 'loginLayout'
    });
  }
  else if(code === '403') {
    res.view("403", {
      layout: 'loginLayout'
    });
  }
  else {
    res.view("500", {
      layout: 'loginLayout'
    });
  }

}
function companyFaqsAddAction(req, res) {
    res.view("admin/faqsAdd", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'adminLayout'
    });

}

function companyNewsAddAction(req, res) {

    res.view("admin/newsAndUpdatesAdd", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'adminLayout'
    });

}


function companyAddressAddAction(req, res) {

    res.view("admin/addCompanyAddress", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'adminLayout'
    });

}

function teamAddAction(req, res) {

    res.view("admin/teamAdd", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'adminLayout'
    });
}

function collegeAddAction(req, res) {
    res.view("admin/collegeAdd", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'adminLayout'
    });

}

function companyFaqsAction(req, res) {
  Faq
  .getFaqs()
  .then(function(faqs) {
    res.view("admin/faqs", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      faqs: faqs,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  });
}

function companyNewsAction(req, res) {
  News
  .getNews()
  .then(function(news) {
    res.view("admin/newsAndUpdates", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      news: news,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  });
}

function aboutCompanyAction(req, res) {
  Company
  .getRecord()
  .then(function(record) {
    if(record.length==1) {
    res.view("admin/aboutCompany", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      record: record,
      layout: 'adminLayout'
    });
  }
  else {
    return res.redirect('/admin/aboutCompanyEdit');
  }
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  })


}

function companyAddressAction(req, res) {

  Address
  .getAddress()
  .then(function(address) {
    res.view("admin/companyAddress", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      address: address,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  });

}

function teamAction(req, res) {
  Team
  .getTeam()
  .then(function(team) {
    res.view("admin/team", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      team: team,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  });
}

function collegeAction(req, res) {
  College
  .getColleges()
  .then(function(colleges) {
    res.view("admin/colleges", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      colleges: colleges,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  });
}

function addTeamMemberAction(req, res) {

  var form = req.form;

  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/teamAdd');

  }

  Team
    .addMember(req)
    .then(function () {
      // send success response
      req.flash("message", "A new team member has been added");

      return res.redirect('/admin/team');
    })
    .catch(function (err) {
      sails.log.error('AdminController#addTeamMemberAction :: Error ::', err);

      // check for the error code and accordingly send the response
      var errors = err.message;
      req.flash("errors", errors);
      return res.redirect('/admin/teamAdd');
    });
}

function addCompanyNewsAction(req, res) {

  var form = req.form;

  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/companyNewsAdd');

  }

  News
    .addNews(req)
    .then(function () {
      // send success response
      req.flash("message", "A new news has been added");

      return res.redirect('/admin/companyNews');
    })
    .catch(function (err) {
      sails.log.error('AdminController#addTeamMemberAction :: Error ::', err);

      // check for the error code and accordingly send the response
      var errors = err.message;
      req.flash("errors", errors);
      return res.redirect('/admin/companyNewsAdd');
    });
}

function aboutCompanyAddAction(req, res) {

  var form = req.form;

  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/aboutCompanyEdit');

  }

  Company
    .addDetails(form)
    .then(function () {
      // send success response
      req.flash("message", "Company details updated");

      return res.redirect('/admin/aboutCompany');
    })
    .catch(function (err) {
      sails.log.error('AdminController#addFaqsAction :: Error ::', err);

      // check for the error code and accordingly send the response
      var errors = err.message;
      req.flash("errors", errors);
      return res.redirect('/admin/"+err.code+"/error');
    });
}

function addCompanyFaqsAction(req, res) {

  var form = req.form;

  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/companyFaqsAdd');

  }

  Faq
    .addFaqs(form)
    .then(function () {
      // send success response
      req.flash("message", "A new faq has been added");

      return res.redirect('/admin/companyFaqs');
    })
    .catch(function (err) {
      sails.log.error('AdminController#addFaqsAction :: Error ::', err);

      // check for the error code and accordingly send the response
      var errors = err.message;
      req.flash("errors", errors);
      return res.redirect('/admin/companyFaqsAdd');
    });
}

function addCompanyAddressAction(req, res) {

  var form = req.form;

  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/companyAddressAdd');

  }

  Address
    .addAddress(form)
    .then(function () {
      // send success response
      req.flash("message", "An address has been added");

      return res.redirect('/admin/companyAddress');
    })
    .catch(function (err) {
      sails.log.error('AdminController#addFaqsAction :: Error ::', err);

      // check for the error code and accordingly send the response
      var errors = err.message;
      req.flash("errors", errors);
      return res.redirect('/admin/companyAddressAdd');
    });
}

function addCollegeAction(req, res) {

  var form = req.form;

  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/collegeAdd');

  }

  College
    .addCollege(form)
    .then(function () {
      // send success response
      req.flash("message", "A new college has been added");

      return res.redirect('/admin/college');
    })
    .catch(function (err) {
      sails.log.error('AdminController#addCollegeAction :: Error ::', err);

      // check for the error code and accordingly send the response
      var errors = err.message;
      req.flash("errors", errors);
      return res.redirect('/admin/collegeAdd');
    });
}

function teamEditAction(req, res) {
  var id = req.param('id');

  Team
  .getRecordWithId(id)
  .then(function(team) {
    res.view("admin/teamEdit", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      team: team,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  })

}
function companyNewsEditAction(req, res) {
  var id = req.param('id');
  News
  .getRecordWithId(id)
  .then(function(news) {
    res.view("admin/companyNewsEdit", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      news: news,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  })

}

function companyFaqsEditAction(req, res) {
  var id = req.param('id');
  Faq
  .getRecordWithId(id)
  .then(function(faqs) {
    res.view("admin/companyFaqsEdit", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      faqs: faqs,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  });

}

function companyAddressEditAction(req, res) {
  var id = req.param('id');
  Address
  .getRecordWithId(id)
  .then(function(address) {
    res.view("admin/companyAddressEdit", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      address: address,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  })

}

function aboutCompanyEditAction(req, res) {
  Company
  .getRecord()
  .then(function(record) {
    res.view("admin/aboutCompanyEdit", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      record: record,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  })

}

function collegeEditAction(req, res) {
  var id = req.param('id');
  College
  .getRecordWithId(id)
  .then(function(college) {
    res.view("admin/collegeEdit", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      college: college,
      layout: 'adminLayout'
    });
  })
  .catch(function(err) {
    return res.redirect("/admin/"+err.code+"/error");
  });

}

function teamUpdateAction(req, res) {
  var id = req.param('id');
  if(!id)
  return res.redirect("/admin/400/error");
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/'+id+'/teamEdit');

  }

  Team
    .updateRecord(id, form)
    .then(function () {
      // send success response
      req.flash("message", "A team member has been updated");

      return res.redirect('/admin/team');
    })
    .catch(function (err) {
      sails.log.error('AdminController#teamUpdateAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function companyNewsUpdateAction(req, res) {
  var id = req.param('id');
  if(!id)
  return res.redirect("/admin/400/error");
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/'+id+'/companyNewsEdit');

  }

  News
    .updateRecord(id, form)
    .then(function () {
      // send success response
      req.flash("message", "A news has been updated");

      return res.redirect('/admin/companyNews');
    })
    .catch(function (err) {
      sails.log.error('AdminController#companyNewsUpdate :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function companyFaqsUpdateAction(req, res) {
  var id = req.param('id');
  if(!id)
  return res.redirect("/admin/400/error");
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/'+id+'/companyFaqsEdit');

  }

  Faq
    .updateRecord(id, form)
    .then(function () {
      // send success response
      req.flash("message", "A faq has been updated");

      return res.redirect('/admin/companyFaqs');
    })
    .catch(function (err) {
      sails.log.error('AdminController#companyFaqsUpdate :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function companyAddressUpdateAction(req, res) {
  var id = req.param('id');
  if(!id)
  return res.redirect("/admin/400/error");
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/'+id+'/companyAddressEdit');

  }

  Address
    .updateRecord(id, form)
    .then(function () {
      // send success response
      req.flash("message", "An address has been updated");

      return res.redirect('/admin/companyAddress');
    })
    .catch(function (err) {
      sails.log.error('AdminController#companyAddressUpdateAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function collegeUpdateAction(req, res) {
  var id = req.param('id');
  if(!id)
  return res.redirect("/admin/400/error");
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/admin/'+id+'/collegeEdit');

  }

  College
    .updateRecord(id, form)
    .then(function () {
      // send success response
      req.flash("message", "A college has been updated");

      return res.redirect('/admin/college');
    })
    .catch(function (err) {
      sails.log.error('AdminController#collegeUpdateAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function companyAddressDeleteAction(req, res) {
  Address
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "An address has been deleted");

      return res.redirect('/admin/companyAddress');
    })
    .catch(function (err) {
      sails.log.error('AdminController#companyAddressDeleteAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function companyFaqDeleteAction(req, res) {
  Faq
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "A faq has been deleted");

      return res.redirect('/admin/companyFaqs');
    })
    .catch(function (err) {
      sails.log.error('AdminController#companyFaqDeleteAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function companyNewsDeleteAction(req, res) {
  News
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "A news been deleted");

      return res.redirect('/admin/companyNews');
    })
    .catch(function (err) {
      sails.log.error('AdminController#companyNewsDeleteAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function companyTeamDeleteAction(req, res) {
  Team
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "A team member has been deleted");

      return res.redirect('/admin/team');
    })
    .catch(function (err) {
      sails.log.error('AdminController#companyTeamDeleteAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}


function collegeDeleteAction(req, res) {
  College
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "A college has been deleted");

      return res.redirect('/admin/college');
    })
    .catch(function (err) {
      sails.log.error('AdminController#collegeDeleteAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}



function getQueryAction(req, res) {

  Query
  .getAllQuery()
  .then(function(query) {
    res.view("admin/query", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      query: query,
      layout: 'adminLayout'
    });
  })
  .catch(function (err) {
    sails.log.error('AdminController#getQueryAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/admin/"+err.code+"/error");
  })
}

function deleteQueryAction(req, res) {
  Query
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "A Query has been deleted");

      return res.redirect('/admin/query');
    })
    .catch(function (err) {
      sails.log.error('AdminController#deleteQueryAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function getCallbackAction(req, res) {
console.log("hi");
  Callback
  .getAllCallback()
  .then(function(callback) {
    res.view("admin/callback", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      callback: callback,
      layout: 'adminLayout'
    });
  })
  .catch(function (err) {
    sails.log.error('AdminController#getCallbackAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/admin/"+err.code+"/error");
  });
}

function deleteCallbackAction(req, res) {
  console.log("hello");
  Callback
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "A request callback has been deleted");

      return res.redirect('/admin/callback');
    })
    .catch(function (err) {
      sails.log.error('AdminController#deleteCallbackAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}

function getApplicationAction(req, res) {

  Application
  .getAllApplication()
  .then(function(app) {
    res.view("admin/app", {
      message: req.flash("message"),
      errors: req.flash("errors"),
      app: app,
      layout: 'adminLayout'
    });
  })
  .catch(function (err) {
    sails.log.error('AdminController#getApplicationAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/admin/"+err.code+"/error");
  });
}

function deleteAppAction(req, res) {
  Application
    .deleteRecord(req.param('id'))
    .then(function () {
      // send success response
      req.flash("message", "An application has been deleted");

      return res.redirect('/admin/application');
    })
    .catch(function (err) {
      sails.log.error('AdminController#deleteAppAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/admin/"+err.code+"/error");
    });
}
