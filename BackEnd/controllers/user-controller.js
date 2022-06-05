//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------
const userHelper = require("../helper/user-helper");
const organizationHelper = require("../helper/organization-helper");
const locationHelper = require("../helper/location-helper");
//------------------Models/Classes------------------------------
const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const userPermissionValidation = require("../validation/userPermissionValidation");

//-----------------HelperFunctions------------------
const restrictUser = userHelper.restrictUser;
const getUser = userHelper.getUser;
const getOrganization = organizationHelper.getOrganization;
const getLocation = locationHelper.getLocation;

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
  //Locating Organization
  let organization = await getUser(user.organization, "id");
  //Checking if error when getting organization
  if (organization instanceof HttpError) {
    return next(organization);
  }

  upv = new userPermissionValidation(user, organization);

  //checking if location upv check is needed
  if (!upv.organizationAuth()) {
    //not a organization wide admin
    let locations = upv.getLocations();
    locations = locations.map((location) => {
      location = getLocation(location, "id");
      upv.setLocationAuthorized(location);
    });
  }
  //JWT Token
  let token;
  try {
    token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        upv: upv.tokenExport(),
      },
      process.env.JWT_Key,
      { expiresIn: "1h" }
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
  userRestricted.token = token;
  res.json(userRestricted);
};

const addUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    preferredName,
    employeeNumber,
    position,
    email,
    phoneNumber,
    primaryLocation,
    payRate,
  } = req.body;
  //will set password automatically to lastname employeeNumber
  let password = `${lastName}${employeeNumber}`;
  //getting requesting user data
  const uid = req.userData.id;
  //getting requesting user
  let user = await getUser(uid, "id");
  if (user instanceof HttpError) {
    const newError = user;
    return next(newError);
  }
  //getting organization
  let organization = getOrganization(user.organization, "oid");
  if (organization instanceof HttpError) {
    const newError = user;
    return next(newError);
  }

  //getting location
  let location = getLocation(primaryLocation, "locationNumber");
  if (location instanceof HttpError) {
    const newError = user;
    return next(newError);
  }
  //checking requesters permission for location
  let upv = new userPermissionValidation(user, location, organization);
  upv = upv.newUser();
  if (upv) {
    return next(upv);
  }
  //Checking if user already has account
  let newUser;
  try {
    newUser = await User.findOne({ email: email });
    if (!newUser) {
      newUser = await User.findOne({ phoneNumber: phoneNumber });
    }
  } catch (error) {
    return next(
      new HttpError("AddUser failed, Could not access database", 500)
    );
  }
  if (!newUser instanceof User) {
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
    employeeNumber,
    position,
    imageUrl: "data/uploads/images/default.svg",
    email,
    phoneNumber: "+1" + phoneNumber,
    password: hashedPassword,
    organization,
    primaryLocation: location,
    alternateLocations: [],
    payRate,
    availability: [],
    updateProperties: ["password", "availability", "imageUrl"],
  });

  //Adding to Location
  location.activeStaff.push(createdUser);
  //Sending new user to DB
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdUser.save({ session: sess });
    await location.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(
      new HttpError("Creating User failed when adding to database", 500)
    );
  }

  const userRestricted = restrictUser(createdUser, "primaryLocationManager");
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
