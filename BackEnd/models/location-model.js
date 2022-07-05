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
    coordinates: [{ type: Number }],
  },
  notes: { type: String },
  activeStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  altStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  archivedStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Maybe make this an object that has includes user object, type of staff, and termination reason.
  schedule: { type: mongoose.Types.ObjectId, ref: "Schedule" }, //First of this month onward
  archivedSchedule: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }], //Previous month and backward. I could set a max
});

module.exports = mongoose.model("Location", locationSchema);
