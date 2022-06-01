//--------------------Imports-----------------
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

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

exports.getOrganization = getOrganization;
