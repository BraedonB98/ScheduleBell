//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------

//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Schedule = require("../models/schedule-model");
const Location = require("../models/location-model");
const User = require("../models/user-model");
//----------------------Controllers-------------------------
const login = async (req, res, next) => {};
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
