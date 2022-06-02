//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------

//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Organization = require("../models/organization-model");
const Location = require("../models/location-model");
const User = require("../models/user-model");
//----------------------Controllers-------------------------
const createOrganization = async (req, res, next) => {
  const {
    //may add a first location in organization at which point have admin primary location set to first location
    organizationName,
    organizationImageUrl,
    organizationColorScheme,
    adminFirstName,
    adminLastName,
    adminPreferredName,
    adminEmployeeNumber,
    adminPosition,
    adminEmail,
    adminPhoneNumber,
    adminPayRate,
    adminPassword,
  } = req.body;

  //Checking if user already has account
  let user;
  try {
    user = await User.findOne({ email: email });
    if (!user instanceof User) {
      user = await User.findOne({ phoneNumber: phoneNumber });
    }
  } catch (error) {
    return next(
      new HttpError("Add Organization failed, Could not access database", 500)
    );
  }
  if (!user instanceof User) {
    return next(
      new HttpError("Could not create user, credentials already in use", 422)
    );
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(adminPassword, 12); //12 is the number of salting rounds(how secure)
  } catch (error) {
    return next(new HttpError("Could not set password correctly", 500));
  }
  //creating organization creator
  const organizationCreator = new User({
    firstName: adminFirstName,
    lastName: adminLastName,
    preferredName: adminPreferredName,
    employeeNumber: adminEmployeeNumber,
    position: adminPosition,
    imageUrl: "data/uploads/images/default.svg",
    email: adminEmail,
    phoneNumber: "+1" + adminPhoneNumber,
    password: hashedPassword,
    organization,
    alternateLocations: [],
    payRate: adminPayRate,
    availability: [],
    updateProperties: ["availability", "imageUrl"],
  });
  //creating organization
  const organization = new Organization({
    name: organizationName,
    accountAdmin: organizationCreator,
    authorizedUsers: [organizationCreator],
    imageUrl: organizationImageUrl,
    accountType: "Trial",
    locations: [],
    organizationColorScheme,
  });

  //adding organization to user now that organization exists
  organizationCreator.organization = organization;
  //Sending new user to DB
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    organization.save({ session: sess });
    organizationCreator.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Creating organization failed", 500));
  }
  const userRestricted = restrictUser(createdUser, "actualUser");
  res.json({ user: userRestricted, organization: organization });
};
const editOrganizationGeneral = async (req, res, next) => {};
const editOrganizationAccountType = async (req, res, next) => {
  //!set timeout 1 month(rerun payment if fail cancel, else reset timeout)
};
const addOrganizationAuthorizedUser = async (req, res, next) => {
  const { user } = req.body;
};
const removeOrganizationAuthorizedUser = async (req, res, next) => {
  //if removing accountAdmin: check req.body for new accountAdmin and only allow if authorizedUsers
  const { user, accountAdmin } = req.body;
};
const patchOrganizationImage = async (req, res, next) => {};
const deleteOrganization = async (req, res, next) => {};
const getOrganizationGeneral = async (req, res, next) => {};
const getOrganizationAccountType = async (req, res, next) => {};
const getOrganizationLocations = async (req, res, next) => {};
//---------------------Exports------------------------------
exports.create = createOrganization;
exports.editGeneral = editOrganizationGeneral;
exports.editAccountType = editOrganizationAccountType;
exports.addAuthorizedUser = addOrganizationAuthorizedUser;
exports.removeAuthorizedUser = removeOrganizationAuthorizedUser;
exports.patchImage = patchOrganizationImage;
exports.delete = deleteOrganization;
exports.getGeneral = getOrganizationGeneral;
exports.getAccountType = getOrganizationAccountType;
exports.getLocations = getOrganizationLocations;
