//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------
const userHelper = require("../helper/user-helper");
const organizationHelper = require("../helper/organization-helper");
const locationHelper = require("../helper/location-helper");
//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Organization = require("../models/organization-model");
const Location = require("../models/location-model");
const User = require("../models/user-model");

//-----------------HelperFunctions------------------
const restrictUser = userHelper.restrictUser;
const restrictOrganization = organizationHelper.restrictOrganization;
const getUser = userHelper.getUser;
const getOrganization = organizationHelper.getOrganization;
const getLocation = locationHelper.getLocation;

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
    alternateLocations: [],
    payRate: adminPayRate,
    availability: [],
    updateProperties: ["availability", "imageUrl"],
  });
  //creating organization
  const organization = new Organization({
    name: organizationName,
    accountAdmin: organizationCreator.id,
    authorizedUsers: [organizationCreator.id],
    imageUrl: organizationImageUrl,
    accountType: "Trial",
    locations: [],
    organizationColorScheme,
  });

  //adding organization to user now that organization exists
  organizationCreator.organization = organization.id;
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
  const userRestricted = restrictUser(organizationCreator, "actualUser");
  res.json({ user: userRestricted, organization: organization });
};
const editOrganizationGeneral = async (req, res, next) => {
  const { name, organizationColorScheme } = req.body;
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
  //checking requesters permission for organization
  let upv = new userPermissionValidation(user, "", organization); //no location required
  upv = upv.organizationPatch();
  if (upv) {
    return next(upv);
  }

  //adding to organization (there is a more efficient way of doing this using ...?)
  if (name) {
    organization.name = name;
  }
  if (organizationColorScheme) {
    organization.name = name;
  }
  //saving change
  try {
    await organization.save();
  } catch (error) {
    return next(
      new HttpError(
        "general changes to organization failed when adding to database",
        500
      )
    );
  }
  res.json(organization);
};
const editOrganizationAccountType = async (req, res, next) => {
  //!set timeout 1 month(rerun payment if fail cancel, else reset timeout)
};
const addOrganizationAuthorizedUser = async (req, res, next) => {
  const { userAdding } = req.body;
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
  //checking requesters permission for organization
  let upv = new userPermissionValidation(user, "", organization); //no location required
  upv = upv.organizationPatch();
  if (upv) {
    return next(upv);
  }
  //getting new authorized user (make sure they exist)
  userAdding = await getUser(userAdding, "id");
  if (user instanceof HttpError) {
    const newError = user;
    return next(newError);
  }

  //adding to organization
  organization.authorizedUsers.push(userAdding.id);
  //saving change
  try {
    await organization.save();
  } catch (error) {
    return next(
      new HttpError(
        "Adding authorized user to organization failed when adding to database",
        500
      )
    );
  }
  res.json(organization);
};
const removeOrganizationAuthorizedUser = async (req, res, next) => {
  //if removing accountAdmin: check req.body for new accountAdmin and only allow if authorizedUsers
  const { userRemoving, accountAdmin } = req.body;
};
const patchOrganizationImage = async (req, res, next) => {
  const { imageUrl } = req.body;
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
  //checking requesters permission for organization
  let upv = new userPermissionValidation(user, "", organization); //no location required
  upv = upv.organizationPatch();
  if (upv) {
    return next(upv);
  }

  //adding to organization (there is a more efficient way of doing this using ...?)
  organization.imageUrl = imageUrl;
  //saving change
  try {
    await organization.save();
  } catch (error) {
    return next(
      new HttpError(
        "general changes to organization failed when adding to database",
        500
      )
    );
  }
  res.json(organization);
};
const deleteOrganization = async (req, res, next) => {
  //this will need to go through and remove all locations from database as well as locations ids from all users listed at each location(and alts)
};
const getOrganizationGeneral = async (req, res, next) => {
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
  //checking requesters permission for organization
  let upv = new userPermissionValidation(user, "", organization); //no location required
  upv = upv.getOrganization(); //will return what access level they have
  if (upv instanceof HttpError) {
    return next(upv);
  }
  organization = restrictOrganization(organization, upv); //restricts organization return data based on user permissions
  res.json(organization);
};
const getOrganizationAccountType = async (req, res, next) => {
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
  //checking requesters permission for organization
  let upv = new userPermissionValidation(user, "", organization); //no location required
  upv = upv.getOrganization(); //will return what access level they have
  if (upv instanceof HttpError) {
    return next(upv);
  }
  organization = restrictOrganization(organization, upv); //restricts organization return data based on user permissions
  res.json(organization);
};
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
