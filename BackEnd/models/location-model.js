const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String },
  notifications: [{ type: String }], //things that the user should be notified about.
  organization: { type: mongoose.Types.ObjectId, ref: "Organization" },
  authorizedPositions: [{ type: mongoose.Types.ObjectId, ref: "Position" }], // only people with specific titles can edit location(also required to be assigned to store number)
  locationIdentifier: { type: String }, //what do you call this store (ie. Denver I25 store, store 1203, ext)
  imageUrl: { type: String },
  location: {
    address: { type: String },
    coordinates: [{ type: Number }],
  },
  notes: { type: String },
  staff: [{ type: mongoose.Types.ObjectId, ref: "User" }], //when getting make sure that it also get their priority so they cant use alt staff first
  archivedStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Maybe make this an object that has includes user object, type of staff, and termination reason.
  schedule: { type: mongoose.Types.ObjectId, ref: "Schedule" }, //First of this month onward
  archivedSchedule: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }], //Previous month and backward. //!set a max for storage saving
});

module.exports = mongoose.model("Location", locationSchema);
