//--------------------Imports-----------------
const HttpError = require("../models/http-error");

//------------------Class--------------------
class userPermissionValidation {
  user;
  organization;
  locations;
  locationsAuthorized;
  organizationAdmin;
  organizationAuthorizedUser;

  constructor(user, organization) {
    this.user = user;
    this.organization = organization;
    this.organizationAdmin = this.user === this.organization.accountAdmin;
    this.organizationAuthorizedUser =
      this.organizationAdmin ||
      this.organization.authorizedUsers.includes(this.user);
    if (this.organizationAuthorizedUser) {
      //if authorized user they have access to all locations
      this.locationsAuthorized = organization.locations;
      this.locations = organization.locations;
    } else {
      this.locations = user.alternateLocations;
      this.locations.push(user.primaryLocation);
    }
  }

  getOrganizationAuth() {
    return this.organizationAuthorizedUser;
  }
  getOrganizationAdmin() {
    return this.organizationAuthorizedUser;
  }
  getLocations() {
    return this.locations;
  }
  setLocationAuthorized(location) {
    if (
      //if authorized and not already in class
      location.authorizedUsers.contains(this.user) &&
      !this.locationsAuthorized.contains(location)
    ) {
      this.locationAuthorized.push(location);
    }
  }
  tokenExport() {
    return {
      user: this.user,
      organization: this.organization,
      locations: this.locations,
      locationsAuthorized: this.locationsAuthorized,
      organizationAdmin: this.organizationAdmin,
      organizationAuthorizedUser: this.organizationAuthorizedUser,
    };
  }
  tokenImport(tokenObject) {
    this.user = tokenObject.user;
    this.organization = tokenObject.organization;
    this.locations = tokenObject.locations;
    this.locationsAuthorized = tokenObject.locationsAuthorized;
    this.organizationAdmin = tokenObject.organizationAdmin;
    this.organizationAuthorizedUser = tokenObject.organizationAuthorizedUser;
  }
}

//-------------Exports--------------
module.exports = userPermissionValidation;
