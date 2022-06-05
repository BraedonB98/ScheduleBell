//--------------------Imports-----------------
const mongoose = require("mongoose");
const {
  ThisMonthPage,
} = require("twilio/lib/rest/api/v2010/account/usage/record/thisMonth");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

//------------------Classes--------------------
class userPermissionValidation {
  user;
  organization;
  location;

  constructor(user, location) {
    //only requires user but saves from having to get from database if provided by outside function(already queried)
    this.user = user;
    if (location) {
      this.location = location;
    }
  }
  checkAuthLevel(minAuth) {
    //translating min auth to number
    switch (minAuth) {
      case "public":
        minAuth = 0;
        break;
      case "general employee":
        minAuth = 1;
        break;
      case "locationAuthUser":
        minAuth = 2;
        break;
      case "organizationAuthUser":
        minAuth = 3;
        break;
      case "accountAdmin":
        minAuth = 4;
        break;
      default:
        console.log("not valid min Auth in UPV");
        return new HttpError("unable to figure out min auth in UPV", 500);
    }
    //checking users auth and if its above the min auth level
    if (this.user === this.organization.accountAdmin && minAuth >= 4) {
      return "accountAdmin";
    } else if (
      this.organization.authorizedUsers.includes(this.user) &&
      minAuth >= 3
    ) {
      return "organizationAuthUser";
    } else if (
      this.location.authorizedUsers.includes(this.user) &&
      minAuth >= 2
    ) {
      //eventually maybe go through each location in user list
      return "locationAuthUser";
    } else if (
      this.user.organization === organization &&
      this.location.activeStaff.includes(this.user) &&
      this.location.organization === this.organization &&
      minAuth >= 1
    ) {
      return "generalEmployee";
    } else if (minAuth >= 0) {
      return "public";
    } //if user does not meet the min auth
    else {
      return new HttpError(
        "You are not authorized to perform that action",
        403
      );
    }
  }
}

//-------------Exports--------------
module.exports = userPermissionValidation;
