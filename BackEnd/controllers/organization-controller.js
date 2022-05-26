//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------

//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Organization = require("../models/organization-model");
const Location = require("../models/location-model");
const User = require("../models/user-model");
//----------------------Controllers-------------------------
const createOrganization = async (req, res, next) => {};
const editOrganizationGeneral = async (req, res, next) => {};
const editOrganizationAccountType = async (req, res, next) => {
  //!set timeout 1 month(rerun payment if fail cancel, else reset timeout)
};
const editOrganizationAuthorizedUsers = async (req, res, next) => {};
const patchOrganizationImage = async (req, res, next) => {};
const deleteOrganization = async (req, res, next) => {};
const getOrganizationGeneral = async (req, res, next) => {};
const getOrganizationAccountType = async (req, res, next) => {};
const getOrganizationLocations = async (req, res, next) => {};
//---------------------Exports------------------------------
exports.create = createOrganization;
exports.editGeneral = editOrganizationGeneral;
exports.editAccountType = editOrganizationAccountType;
exports.editAuthorizedUsers = editOrganizationAuthorizedUsers;
exports.patchImage = patchOrganizationImage;
exports.delete = deleteOrganization;
exports.getGeneral = getOrganizationGeneral;
exports.getAccountType = getOrganizationAccountType;
exports.getLocations = getOrganizationLocations;
