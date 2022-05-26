//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------

//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Location = require("../models/location-model");
const User = require("../models/user-model");
//----------------------Controllers-------------------------
const addLocation = async (req, res, next) => {};
const addLocationStaff = async (req, res, next) => {};
const editLocationGeneral = async (req, res, next) => {};
const patchLocationImage = async (req, res, next) => {};
const deleteLocation = async (req, res, next) => {};
const removeLocationStaff = async (req, res, next) => {};
const getLocationGeneral = async (req, res, next) => {};
const getLocationNotes = async (req, res, next) => {};
const getLocationStaff = async (req, res, next) => {};
const getLocationArchivedStaff = async (req, res, next) => {};
const getLocationActiveSchedule = async (req, res, next) => {};
const getLocationArchivedSchedule = async (req, res, next) => {};
//---------------------Exports------------------------------
exports.add = addLocation;
exports.addStaff = addLocationStaff;
exports.editGeneral = editLocationGeneral;
exports.patchImage = patchLocationImage;
exports.delete = deleteLocation;
exports.removeStaff = removeLocationStaff;
exports.getGeneral = getLocationGeneral;
exports.getNotes = getLocationNotes;
exports.getStaff = getLocationStaff;
exports.getArchivedStaff = getLocationArchivedStaff;
exports.getActiveSchedule = getLocationActiveSchedule;
exports.getArchivedSchedule = getLocationArchivedSchedule;
