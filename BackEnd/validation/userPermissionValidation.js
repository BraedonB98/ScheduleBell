//--------------------Imports-----------------
const mongoose = require("mongoose");
const {
  ThisMonthPage,
} = require("twilio/lib/rest/api/v2010/account/usage/record/thisMonth");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

//!this still has alot of work to be done, currently just returning true to all checks to allow me to test code
//------------------Classes--------------------
class userPermissionValidation {
  user;
  organization;
  location;
  users = [];

  constructor(user, location) {
    //only requires user but saves from having to get from database if provided by outside function(already queried)
    this.user = user;
    if (location) {
      this.location = location;
    }
  }

  //----Permission Checks--------
  newLocation() {
    //check if user is authorized user of organization, if so return false, else return error
    return false;
  }
  newUser() {
    //check if user is authorized user of location, if so return false else return error
    // if (not allowed to add user) {
    //   new HttpError(
    //     "You dont have required authorization to add a user to this location",
    //     403
    //   );
    // }
    return false;
  }
  organizationPatch() {
    // if (not allowed authorized user on organization) {
    //   new HttpError(
    //     "You dont have required authorization to change organization",
    //     403
    //   );
    // }
    return false;
  }
}

//-------------Exports--------------
module.exports = userPermissionValidation;
