//--------------------imports-------------------------
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//------------------Modules--------------------------
const userHelper = require("../helper/user-helper");
const organizationHelper = require("../helper/organization-helper");
//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Organization = require("../models/organization-model");
const User = require("../models/user-model");

//-----------------HelperFunctions------------------
const restrictUser = userHelper.restrictUser;
const getUser = userHelper.getUser;
const getOrganization = organizationHelper.getOrganization;

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
    user = await User.findOne({ email: adminEmail });
    if (!user instanceof User) {
      user = await User.findOne({ phoneNumber: adminPhoneNumber });
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
    console.log(error);
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
  organizationCreator.organization = organization._id;
  //Sending new user to DB
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await organization.save({ session: sess });
    await organizationCreator.save({ session: sess });
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
  //making object stored in token into class
  let upv = new userPermissionValidation(user, user.organization);
  upv.tokenImport(req.userData.upv);
  //checking requesters permission for organization
  if (upv.getOrganizationAuth) {
    return next(
      new HttpError("Need permission to edit organization information", 403)
    );
  }

  if (
    organization.name === name &&
    organizationColorScheme === organization.organizationColorScheme
  ) {
    return next(
      new HttpError(
        "Information provided is already set as organization information",
        409
      )
    );
  }

  //editing organization if values provided
  organization.name = name ? name : organization.name;
  organization.organizationColorScheme = organizationColorScheme
    ? organizationColorScheme
    : organization.organizationColorScheme;

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
  //making object stored in token into class
  let upv = new userPermissionValidation(user, user.organization);
  upv.tokenImport(req.userData.upv);
  //checking requesters permission for organization
  if (upv.getOrganizationAdmin) {
    return next(new HttpError("Only Admin can add authorized Users", 403));
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
  //making object stored in token into class
  let upv = new userPermissionValidation(user, user.organization);
  upv.tokenImport(req.userData.upv);
  //checking requesters permission for organization
  if (upv.getOrganizationAuth) {
    return next(
      new HttpError("Need permission to edit organization image", 403)
    );
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
  //making object stored in token into class
  let upv = new userPermissionValidation(user, user.organization);
  upv.tokenImport(req.userData.upv);
  //checking requesters permission for organization
  organization = upv.restrictOrganization(organization); //restricts organization information based on user permissions or error if something isnt right
  if (organization instanceof HttpError) {
    return next(organization);
  }
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
  //making object stored in token into class
  let upv = new userPermissionValidation(user, user.organization);
  upv.tokenImport(req.userData.upv);
  //checking requesters permission for organization
  if (upv.getOrganizationAuth) {
    return next(new HttpError("not authorized to get account type", 403));
  }
  res.json(organization.accountType);
};

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
