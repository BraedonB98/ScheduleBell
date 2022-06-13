//--------------------Imports-----------------
const HttpError = require("../models/http-error");
const Organization = require("../models/organization-model");
const User = require("../models/user-model");
//------------------Class--------------------
class userPermissionValidation {
  user;
  organization;
  locations;
  locationsAuthorized;
  organizationAdmin;
  organizationAuthorizedUser;

  constructor(user, organization) {
    if (!(user instanceof User)) {
      return new HttpError("Did not receive a user object", 400);
    }
    this.user = user;
    if (!(organization instanceof Organization)) {
      return new HttpError("Did not receive a organization object", 400);
    }
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
  restrictOrganization(organizationRestricted) {
    if (!(organization instanceof Organization)) {
      return new HttpError(
        "Did not receive a organization object to restrict",
        400
      );
    }
    if (this.organization.id !== organizationRestricted.id) {
      return new HttpError("You are not authorized on this organization", 403);
    }
    if (this.organizationAdmin) {
      organizationRestricted = {
        name: organization.name,
        accountAdmin: organization.accountAdmin,
        authorizedUsers: organization.authorizedUsers,
        imageUrl: organization.imageUrl,
        accountType: organization.accountType,
        notes: organization.notes,
        locations: organization.locations,
        organizationColorScheme: organization.organizationColorScheme,
      };
    } else if (this.organizationAuthorizedUser) {
      organizationRestricted = {
        name: organization.name,
        authorizedUsers: organization.authorizedUsers,
        imageUrl: organization.imageUrl,
        notes: organization.notes,
        locations: organization.locations,
        organizationColorScheme: organization.organizationColorScheme,
      };
    } else if (this.locationsAuthorized.length() !== 0) {
      //authorized on > 0  locations
      organizationRestricted = {
        name: organization.name,
        imageUrl: organization.imageUrl,
        locations: organization.locations,
        organizationColorScheme: organization.organizationColorScheme,
      };
    } else {
      //general employee
      organizationRestricted = {
        name: organization.name,
        imageUrl: organization.imageUrl,
        locations: organization.locations,
        organizationColorScheme: organization.organizationColorScheme,
      };
    }
    return organizationRestricted;
  }
  organizationAuth() {
    return this.organizationAuthorizedUser;
  }
  organizationAdmin() {
    return this.organizationAuthorizedUser;
  }
  locations() {
    return this.locations;
  }
  locationsAuthorized() {
    return this.locationsAuthorized;
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
      organization: this.organization,
      locations: this.locations,
      locationsAuthorized: this.locationsAuthorized,
      organizationAdmin: this.organizationAdmin,
      organizationAuthorizedUser: this.organizationAuthorizedUser,
    };
  }
  tokenImport(tokenObject) {
    this.organization = tokenObject.organization;
    this.locations = tokenObject.locations;
    this.locationsAuthorized = tokenObject.locationsAuthorized;
    this.organizationAdmin = tokenObject.organizationAdmin;
    this.organizationAuthorizedUser = tokenObject.organizationAuthorizedUser;
  }
}

//-------------Exports--------------
module.exports = userPermissionValidation;
