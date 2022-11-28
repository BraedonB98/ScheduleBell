const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String },
  purposeStatement: { type: String },
  accountAdmin: { type: mongoose.Types.ObjectId, ref: "User" },
  authorizedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  imageUrl: { type: String },
  accountType: { type: String }, //Trial, (then subscription options), DevApproved(free but full feature)
  notes: { type: String },
  locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
  organizationColorScheme: { type: mongoose.Types.ObjectId, ref: "Color" },
});

module.exports = mongoose.model("Organization", organizationSchema);
