const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String },
  authorizedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  imageUrl: { type: String },
  accountType: { type: String },
  notes: { type: String },
  locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
  organizationColorScheme: [{ type: String }],
});

module.exports = mongoose.model("Organization", organizationSchema);
