//--------------------Imports-----------------
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const User = require("../models/user-model");

//-------------------Functions-----------------

//getUser takes in an identifier and searchType and if there is a user in the database with
//a user that fits those it will return the user
const getUser = (identifier, searchType) => {
  getUserByEN = async (EN) => {
    let user;
    if (EN === null) {
      return new HttpError("no employee number provided", 400);
    }
    try {
      user = await User.findOne({ employeeId: EN });
    } catch (error) {
      return new HttpError("Could not access database", 500);
    }
    if (!user) {
      return new HttpError("User not in database", 404);
    }
    return user;
  };
  const getUserById = async (uid) => {
    let user;
    if (uid === null) {
      return new HttpError("no uid provided", 400);
    }
    if (typeof uid === "string") {
      //!var ObjectID = require("mongodb").ObjectID;
      uid = new mongoose.ObjectID(uid); //!no mongoose.
    }
    try {
      user = await User.findById(uid);
    } catch (error) {
      return new HttpError("Could not access user in database", 500);
    }
    if (!user) {
      return new HttpError("User not in database", 404);
    }
    return user;
  };

  if (searchType === "employeeNumber") {
    return getUserByEN(identifier);
  } else if (searchType === "id") {
    return getUserById(identifier);
  }
};

//Restrict User takes in a user to restrict and the level of restrictions to apply
//Then returns a user object with different amounts of information depending on level
const restrictUser = (user, restrictionLevel) => {
  let userRestricted;
  if (restrictionLevel === "generalEmployees") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      primaryLocation: user.primaryLocation,
    };
  } else if (restrictionLevel === "locationEmployee") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      position: user.position,
      imageUrl: user.imageUrl,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
    };
  } else if (restrictionLevel === "alternateLocationManager") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      payRate: user.payRate,
      availability: user.availability,
    };
  } else if (restrictionLevel === "primaryLocationManager") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      employeeNumber: user.employeeNumber,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      alternateLocations: user.alternateLocations,
      payRate: user.payRate,
      availability: user.availability,
    };
  } else if (restrictionLevel === "organizationManager") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      employeeNumber: user.employeeNumber,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      alternateLocations: user.alternateLocations,
      payRate: user.payRate,
      availability: user.availability,
      id: user._id,
    };
  } else if (restrictionLevel === "actualUser") {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      employeeNumber: user.employeeNumber,
      position: user.position,
      imageUrl: user.imageUrl,
      email: user.email,
      phoneNumber: user.phoneNumber,
      primaryLocation: user.primaryLocation,
      alternateLocations: user.alternateLocations,
      payRate: user.payRate,
      availability: user.availability,
      id: user._id,
      token: token,
    };
  } else {
    userRestricted = {
      firstName: user.firstName,
      lastName: user.lastName,
      preferredName: user.preferredName,
      primaryLocation: user.primaryLocation,
    };
  }
  return userRestricted;
};

//-------------Exports--------------
exports.getUser = getUser;
exports.restrictUser = restrictUser;
