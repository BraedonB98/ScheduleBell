//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------
const userHelper = require("../helper/user-helper");
//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Schedule = require("../models/schedule-model");
const Location = require("../models/location-model");
const User = require("../models/user-model");

//-----------------HelperFunctions------------------
const restrictUser = userHelper.restrictUser;
const getUser = userHelper.getUser;

//----------------------Controllers-------------------------
const login = async (req, res, next) => {
  //check first login if true then change password
  const { employeeNumber, password } = req.body;
  //Locating User
  let user;
  user = await getUser(employeeNumber, "employeeNumber");
  //Checking if error when getting user
  if (user instanceof HttpError) {
    const newError = user;
    return next(newError);
  }
  //Checking Password
  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(
      new HttpError("Failed to check credentials, please try again later", 500)
    );
  }
  if (!isValidPassword) {
    return next(new HttpError("Login Failed,invalid credentials", 401));
  }
  //JWT Token
  let token;
  try {
    token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_Key,
      { expiresIn: "2h" }
    );
  } catch (error) {
    return next(
      new HttpError(
        "Failed to make a secure connection, please try again later",
        500
      )
    );
  }
  const userRestricted = restrictUser(user, "actualUser");
  res.json(userRestricted);
};
const addUser = async (req, res, next) => {};
const general = async (req, res, next) => {};
const transferPrimaryLocation = async (req, res, next) => {};
const editJobCode = async (req, res, next) => {};
const editPayRate = async (req, res, next) => {};
const editAvailability = async (req, res, next) => {};
const removeAltLocation = async (req, res, next) => {};
const getGeneral = async (req, res, next) => {};
const getLocations = async (req, res, next) => {};
const getPayRate = async (req, res, next) => {};
const getAvailability = async (req, res, next) => {};

//---------------------Exports------------------------------
exports.login = login;
exports.addUser = addUser;
exports.general = general;
exports.transferPrimaryLocation = transferPrimaryLocation;
exports.editJobCode = editJobCode;
exports.editPayRate = editPayRate;
exports.editAvailability = editAvailability;
exports.removeAltLocation = removeAltLocation;
exports.getGeneral = getGeneral;
exports.getLocations = getLocations;
exports.getPayRate = getPayRate;
exports.getAvailability = getAvailability;
