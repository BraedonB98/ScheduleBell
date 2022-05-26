//--------------------imports-------------------------
const mongoose = require("mongoose");

//------------------Modules--------------------------

//------------------Models------------------------------
const HttpError = require("../models/http-error");
const Location = require("../models/location-model");
const User = require("../models/user-model");
//----------------------Controllers-------------------------
const createSchedule = async (req, res, next) => {};
const editCalendar = async (req, res, next) => {};
const getCalendar = async (req, res, next) => {};
const getSchedule = async (req, res, next) => {};

//---------------------Exports------------------------------
exports.create = createSchedule;
exports.editCalendar = editCalendar;
exports.getCalendar = getCalendar;
exports.getSchedule = getSchedule;
