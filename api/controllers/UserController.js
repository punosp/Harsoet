/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var _ = require('lodash');
module.exports = {


  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  errorPage: errorPageAction,
  homepage : homepageAction,
  aboutUs: aboutUsAction,
  services: servicesAction,
  contactUs: contactUsAction,
  apply: applyAction,
  updates: updatesAction,
  history: historyAction,
  team: teamAction,
  faq: faqAction,
  feedback: feedbackAction,
  showNews: showNewsAction,
  mbbs: mbbsAction,
  college: collegeAction,
  query: queryAction,
  applyOnline: applyOnlineAction,
  requestCallBack: requestCallBackAction
  // job: jobAction
}


function errorPageAction(req, res) {
  res.view("403", {
    layout: 'layout'
  });
}


function homepageAction(req, res) {

var partialData, faqs=[], company;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return Faq.getFaqs();
  })
  .then(function(faq) {
    var count =0;
    _.forEach(faq, function(value) {
      faqs.push(value);
      count++;
      if(count==5) {
        return false;
      }
    })
    return Company.getRecord();
  })
  .then(function(comp) {
    company = comp;
    res.view("user/homepage", {
      partialData: partialData,
      faqs: faqs,
      company: company,
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#homepageAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });



}

function aboutUsAction(req, res) {

var partialData, company;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return Company.getRecord();
  })
  .then(function(comp) {
    company = comp;
    res.view("user/about", {
      partialData: partialData,
      company: company,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#aboutUsAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function historyAction(req, res) {

var partialData, company;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return Company.getRecord();
  })
  .then(function(comp) {
    company = comp;
    res.view("user/company-history", {
      partialData: partialData,
      company: company,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#historyAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function teamAction(req, res) {

var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return Team.getTeam();
  })
  .then(function(team) {
    res.view("user/our-team", {
      partialData: partialData,
      team: team,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#teamAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function faqAction(req, res) {

  var partialData, faqs, company;
    User
    .partialData()
    .then(function(pData) {
      partialData = pData;
      return Faq.getFaqs();
    })
    .then(function(faq) {
      faqs = faq;
      return Company.getRecord();
    })
    .then(function(comp) {
      company = comp;
      res.view("user/faq", {
        partialData: partialData,
        faqs: faqs,
        company: company,
        layout: 'layout'
      });
    })
    .catch(function (err) {
      sails.log.error('UserController#faqAction :: Error ::', err);

      // check for the error code and accordingly send the response
      return res.redirect("/error");
    });

}

function feedbackAction(req, res) {

var partialData, company;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return Company.getRecord();
  })
  .then(function(comp) {
    company = comp;
    res.view("user/client-feedback", {
      partialData: partialData,
      company: company,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#feedbackAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function updatesAction(req, res) {

var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return News.getNews();
  })
  .then(function(news) {
    res.view("user/blog-list", {
      partialData: partialData,
      news: news,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#updatesAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function contactUsAction(req, res) {

var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    //console.log("m",req.flash("error"));
    res.view("user/contact", {
      partialData: partialData,
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#contactUsAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function applyAction(req, res) {

var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    res.view("user/apply", {
      partialData: partialData,
      message: req.flash("message"),
      errors: req.flash("errors"),
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#applyAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function servicesAction(req, res) {

var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    res.view("user/services", {
      partialData: partialData,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#servicesAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function showNewsAction(req, res) {
  var id = req.param('id');
var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return News.getRecordWithId(id);
  })
  .then(function(news) {
    res.view("user/blog-single", {
      partialData: partialData,
      news: news,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#servicesAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function mbbsAction(req, res) {
var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return College.getColleges()
  })
  .then(function(colleges) {
    res.view("user/mbbs", {
      partialData: partialData,
      colleges: colleges,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#mbbsAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function collegeAction(req, res) {
  var id = req.param("id");
var partialData;
  User
  .partialData()
  .then(function(pData) {
    partialData = pData;
    return College.getRecordWithId(id);
  })
  .then(function(college) {
    res.view("user/single-college", {
      partialData: partialData,
      college: college,
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#mbbsAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });
}

function queryAction(req, res) {
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });
    console.log(flashMessages);
    return res.redirect('/contactUs');

  }
  Query
  .addQuery(form)
  .then(function(data) {
    req.flash("message", "We will come back to you soon...");
    return res.redirect('/contactUs');
  })
  .catch(function (err) {
    sails.log.error('UserController#queryAction :: Error ::', err);
    req.flash("errors", "Please try again");
    return res.redirect('/contactUs');
  });
}

function applyOnlineAction(req, res) {
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/apply');

  }
  Application
  .addApplication(form)
  .then(function(data) {
    req.flash("message", "We will come back to you soon...");
    return res.redirect('/apply');
  })
  .catch(function (err) {
    sails.log.error('UserController#applyOnlineAction :: Error ::', err);
    req.flash("errors", "Please try again");
    return res.redirect('/apply');
  });
}

function requestCallBackAction(req, res) {
  var form = req.form;
  if(!form.isValid) {
    // TODO: throw error
    var flashMessages = ValidationService
      .getFormFlashMessages(req.form.getErrors());
    _.forEach(flashMessages, function (message) {
      req.flash('errors', message);
    });

    return res.redirect('/');

  }
  Callback
  .addCallback(form)
  .then(function(data) {
    req.flash("message", "We will come back to you soon...");
    return res.redirect('/');
  })
  .catch(function (err) {
    sails.log.error('UserController#requestCallBackAction :: Error ::', err);
    req.flash("errors", "Please try again");
    return res.redirect('/');
  });
}
