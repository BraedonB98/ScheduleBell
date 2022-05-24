const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organization = new Schema({
  name: { type: String },
  //ID
  imageUrl: { type: String },
  contactEmails: [{ type: String }],
  authorizedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }], //users authorized to edit organization information
  accountType: { type: String },
  notes: { type: String },
  locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
});

module.exports = mongoose.model("Organization", organizationSchema);
