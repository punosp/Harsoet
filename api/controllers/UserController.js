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

  homepage : homepageAction
}



function homepageAction(req, res) {

    res.view("user/homepage", {
      layout: 'layout'
    });


}
