const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organization = new Schema({
  name: { type: String },
  authorizedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  imageUrl: { type: String },
  contactEmails: [{ type: String }],
  accountType: { type: String },
  notes: { type: String },
  locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
});

module.exports = mongoose.model("Organization", organizationSchema);
