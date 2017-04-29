/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }

  AdminController: {
    dashBoard: ["isAuthenticated","isAdminRole"],
    loginSubmit: ["validation/LoginValidation", "UserLoginCheck", "LocalLogin"],
    forgotPassword: ["validation/ForgotPasswordValidation"],
    resetPasswordSubmit: ["validation/ResetPasswordValidation"],
    enterChangedPassword: "isAuthenticated",
    changePassword: ["isAuthenticated","validation/ChangePasswordValidation"],
    dashBoard: ["isAuthenticated","isAdminRole"],

    aboutCompany: ["isAuthenticated","isAdminRole"],
    companyNews: ["isAuthenticated","isAdminRole"],
    companyFaqs: ["isAuthenticated","isAdminRole"],
    companyAddress: ["isAuthenticated","isAdminRole"],
    team: ["isAuthenticated","isAdminRole"],
    college: ["isAuthenticated","isAdminRole"],

    companyNewsAdd: ["isAuthenticated","isAdminRole"],
    companyFaqsAdd: ["isAuthenticated","isAdminRole"],
    companyAddressAdd: ["isAuthenticated","isAdminRole"],
    teamAdd: ["isAuthenticated","isAdminRole"],
    collegeAdd: ["isAuthenticated","isAdminRole"],

    aboutCompanyEdit: ["isAuthenticated","isAdminRole"],
    teamEdit: ["isAuthenticated","isAdminRole"],
    companyNewsEdit: ["isAuthenticated","isAdminRole"],
    companyFaqsEdit: ["isAuthenticated","isAdminRole"],
    companyAddressEdit: ["isAuthenticated","isAdminRole"],
    collegeEdit: ["isAuthenticated","isAdminRole"],

    addTeamMember: ["validation/AddTeamValidation","isAuthenticated","isAdminRole"],
    addCompanyNews: ["validation/AddNewsValidation","isAuthenticated","isAdminRole"],
    addCompanyFaqs: ["validation/AddFaqsValidation","isAuthenticated","isAdminRole"],
    aboutCompanyAdd: ["validation/AddAboutValidation","isAuthenticated","isAdminRole"],
    addCompanyAddress: ["validation/AddAddressValidation","isAuthenticated","isAdminRole"],
    addCollege: ["validation/AddCollegeValidation","isAuthenticated","isAdminRole"],

    teamUpdate: ["validation/AddTeamValidation","isAuthenticated","isAdminRole"],
    companyNewsUpdate: ["validation/AddNewsValidation","isAuthenticated","isAdminRole"],
    companyFaqsUpdate: ["validation/AddFaqsValidation","isAuthenticated","isAdminRole"],
    companyAddressUpdate: ["validation/AddAddressValidation","isAuthenticated","isAdminRole"],
    collegeUpdate: ["validation/AddCollegeValidation","isAuthenticated","isAdminRole"],


    companyAddressDelete: ["isAuthenticated","isAdminRole"],
    companyFaqDelete: ["isAuthenticated","isAdminRole"],
    companyNewsDelete: ["isAuthenticated","isAdminRole"],
    companyTeamDelete:["isAuthenticated","isAdminRole"],
    collegeDelete: ["isAuthenticated","isAdminRole"],

    getQuery: ["isAuthenticated","isAdminRole"],
    deleteQuery: ["isAuthenticated","isAdminRole"],
    getCallback: ["isAuthenticated","isAdminRole"],
    deleteCallback: ["isAuthenticated","isAdminRole"],
    getApplication: ["isAuthenticated","isAdminRole"],
    deleteApp: ["isAuthenticated","isAdminRole"],

    errorPage: ["isAuthenticated","isAdminRole"]

  },
  UserController: {
    query: "validation/QueryValidation",
    applyOnline: "validation/ApplicationValidation",
    requestCallBack: "validation/CallbackValidation"
  }
};
