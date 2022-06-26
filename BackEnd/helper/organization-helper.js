//--------------------Imports-----------------
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Organization = require("../models/organization-model");

//-------------------Functions-----------------

//getOrganization takes in an identifier and searchType and returns Organization if in the database

const getOrganization = (identifier, searchType) => {
  const getOrganizationById = async (oid) => {
    let organization;
    if (oid === null) {
      return new HttpError("no oid provided", 400);
    }
    if (typeof oid === "string") {
      oid = new mongoose.ObjectID(oid);
    }
    try {
      organization = await Organization.findById(oid);
    } catch (error) {
      return new HttpError("Could not access organization in database", 500);
    }
    if (!organization) {
      return new HttpError("Organization not in database", 404);
    }
    return organization;
  };
  const getOrganizationByName = async (name) => {
    let organization;
    if (name === null) {
      return new HttpError("no organization name provided", 400);
    }
    try {
      organization = await Organization.findOne({ name: name });
    } catch (error) {
      return new HttpError("Could not access organization in database", 500);
    }
    if (!organization) {
      return new HttpError(`${name} (Organization) not in database`, 404);
    }
    return organization;
  };

  if (searchType === "id") {
    return getOrganizationById(identifier);
  } else if (searchType === "name") {
    return getOrganizationByName(identifier);
  }
};

exports.getOrganization = getOrganization;
