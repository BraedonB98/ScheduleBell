const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String },
  authorizedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  locationNumber: { type: String },
  imageUrl: { type: String },
  location: {
    address: { type: String },
    coordinates: { type: String },
  },
  notes: { type: String },
  activeStaff: { type: mongoose.Types.ObjectId, ref: "User" },
  archivedStaff: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  schedule: { type: mongoose.Types.ObjectId, ref: "Schedule" },
});

module.exports = mongoose.model("Location", locationSchema);
