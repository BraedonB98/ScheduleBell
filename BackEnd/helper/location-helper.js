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
    return getLocationById(identifier);
  } else if (searchType === "name") {
    return getLocationByName(identifier);
  }
};

exports.getLocation = getLocation;
