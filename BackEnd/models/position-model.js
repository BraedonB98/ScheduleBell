const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const positionSchema = new Schema({
  organization: { type: mongoose.Types.ObjectId, ref: "Organization" },
  priority: { type: String }, //primary location/position = 0
  employeeNumber: { type: String },
  payRate: { type: String },
  primaryLocation: { type: mongoose.Types.ObjectId, ref: "Location" },
  notifications: [{ type: String }],
  employeeRating: { type: String },
});

module.exports = mongoose.model("Position", positionSchema);
