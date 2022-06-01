//--------------------Imports-----------------
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Location = require("../models/location-model");

//-------------------Functions-----------------

//getLocation takes in an identifier and searchType and returns Location if in the database

const getLocation = (identifier, searchType) => {
  const getLocationById = async (oid) => {};
  const getLocationByName = async (name) => {};

  if (searchType === "id") {
    return getUserById(identifier);
  } else if (searchType === "name") {
    return getUserByName(identifier);
  }
};

exports.getLocation = getLocation;
