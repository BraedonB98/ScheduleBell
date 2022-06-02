//--------------------Imports-----------------
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Organization = require("../models/organization-model");

//-------------------Functions-----------------

//getOrganization takes in an identifier and searchType and returns Organization if in the database

const getOrganization = (identifier, searchType) => {
  const getOrganizationById = async (oid) => {};
  const getOrganizationByName = async (name) => {};

  if (searchType === "id") {
    return getUserById(identifier);
  } else if (searchType === "name") {
    return getUserByName(identifier);
  }
};

const restrictOrganization = (organization, restrictionLevel) => {
  if (!(organization instanceof Organization)) {
    return new HttpError("Did not receive a user object to restrict", 400);
  }
  let organizationRestricted;
  if (restrictionLevel === "generalEmployee") {
    organizationRestricted = {
      name: organization.name,
      imageUrl: organization.imageUrl,
      locations: organization.locations,
      organizationColorScheme: organization.organizationColorScheme,
    };
  } else if (restrictionLevel === "authorizedUser") {
    organizationRestricted = {
      name: organization.name,
      authorizedUsers: organization.authorizedUsers,
      imageUrl: organization.imageUrl,
      notes: organization.notes,
      locations: organization.locations,
      organizationColorScheme: organization.organizationColorScheme,
    };
  } else if (restrictionLevel === "accountAdmin") {
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
  } else {
    organizationRestricted = {
      name: organization.name,
      imageUrl: organization.imageUrl,
    };
  }
  return organizationRestricted;
};

exports.restrictOrganization = restrictOrganization;
exports.getOrganization = getOrganization;
