//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------

//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Location = require("../models/location-model");
const User = require("../models/user-model");
//----------------------Controllers-------------------------
const addLocation = async (req, res, next) => {};
const editAuth = async (req, res, next) => {};
const hireStaff = async (req, res, next) => {};
const editLocation = async (req, res, next) => {};
const patchImage = async (req, res, next) => {};
const deleteLocation = async (req, res, next) => {};
const removeStaff = async (req, res, next) => {};
const notification = async (req, res, next) => {};
const deleteNotification = async (req, res, next) => {};
const getRestricted = async (req, res, next) => {};
const getNotes = async (req, res, next) => {};
const getStaff = async (req, res, next) => {};
const getArchivedStaff = async (req, res, next) => {};
const getSchedule = async (req, res, next) => {};
const getArchivedSchedule = async (req, res, next) => {};

//---------------------Exports------------------------------
exports.add = addLocation;
exports.editAuth = editAuth;
exports.hireStaff = hireStaff;
exports.editLocation = editLocation;
exports.patchImage = patchImage;
exports.delete = deleteLocation;
exports.removeStaff = removeStaff;
exports.notification = notification;
exports.deleteNotification = deleteNotification;
exports.getRestricted = getRestricted;
exports.getNotes = getNotes;
exports.getStaff = getStaff;
exports.getArchivedStaff = getArchivedStaff;
exports.getSchedule = getSchedule;
exports.getArchivedSchedule = getArchivedSchedule;
