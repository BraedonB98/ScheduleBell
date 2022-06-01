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
const addUser = async (req, res, next) => {
  const uid = req.userData.id;
  let user = await getUser(uid, "id");
  //Checking if error when getting user
  if (user instanceof HttpError) {
    const newError = user;
    return next(newError);
  }
  let accessLevel = false;
  //!checking if request is authorized
  if (!accessLevel) {
    return next(
      new HttpError("You dont have required authorization to add a user", 401)
    );
  }

  const {
    firstName,
    lastName,
    preferredName,
    employeeId,
    email,
    phoneNumber,
    jobCode,
    permissions,
    password,
  } = req.body; //will set password automatically to employeeId

  //Checking if user already has account
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      existingUser = await User.findOne({ phoneNumber: phoneNumber });
    }
  } catch (error) {
    return next(
      new HttpError("Sign up failed, Could not access database", 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError("Could not create user, credentials already in use", 422)
    );
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12); //12 is the number of salting rounds(how secure)
  } catch (error) {
    return next(new HttpError("Could not set password correctly", 500));
  }

  //Creating new user
  const createdUser = new User({
    firstName,
    lastName,
    preferredName,
    jobCode,
    imageUrl: "data/uploads/images/default.svg",
    email,
    phoneNumber: "+1" + phoneNumber,
    password: hashedPassword,
    employeeId,
    certifications: [],
    permissions,
  });
  //Sending new user to DB
  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError("Creating user failed", 500));
  }

  const userRestricted = {
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    preferredName: createdUser.lastName,
    employeeId: createdUser.employeeId,
    email: createdUser.email,
    phoneNumber: createdUser.phoneNumber,
    jobCode: createdUser.jobCode,
    permissions: createdUser.permissions,
    id: createdUser._id,
    imageUrl: createdUser.imageUrl,
  };

  res.json(userRestricted);
};
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
