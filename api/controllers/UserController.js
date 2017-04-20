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
  // aboutUs: aboutUsAction,
  // services: servicesAction,
  // contactUs: contactUsAction,
  // apply: applyAction,
  // updates: updatesAction,
  // history: historyAction,
  // team: teamAction,
  // faq: faqAction,
  // feedback: feedbackAction,
  // mbbs: mbbsAction,
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
      layout: 'layout'
    });
  })
  .catch(function (err) {
    sails.log.error('UserController#homepageAction :: Error ::', err);

    // check for the error code and accordingly send the response
    return res.redirect("/error");
  });



}
