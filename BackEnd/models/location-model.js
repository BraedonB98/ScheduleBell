const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String },
  organization: { type: mongoose.Types.ObjectId, ref: "Organization" },
  authorizedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  locationNumber: { type: String },
  imageUrl: { type: String },
  location: {
    address: { type: String },
    coordinates: { type: String },
  },
  notes: { type: String },
  activeStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  altStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  archivedStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Maybe make this an object that has includes user object, type of staff, and termination reason.
  schedule: { type: mongoose.Types.ObjectId, ref: "Schedule" }, //1 months schedule
  archivedSchedule: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }],
});

module.exports = mongoose.model("Location", locationSchema);
