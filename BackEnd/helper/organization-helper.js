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
    return getOrganizationById(identifier);
  } else if (searchType === "name") {
    return getOrganizationByName(identifier);
  }
};

exports.getOrganization = getOrganization;
