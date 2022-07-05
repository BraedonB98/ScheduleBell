const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String },
  accountAdmin: { type: mongoose.Types.ObjectId, ref: "User" },
  authorizedUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  imageUrl: { type: String },
  accountType: { type: String }, //Trial, (then subscription options), DevApproved(free but full feature)
  notes: { type: String },
  locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
  organizationColorScheme: {
    colorPrimary: { type: String },
    colorPrimaryVariant: { type: String },
    colorSecondary: { type: String },
    colorSecondaryVariant: { type: String },
    colorBackground: { type: String },
    colorSurface: { type: String },
    colorError: { type: String },
    colorOnImages: { type: String },
    colorOnPrimary: { type: String },
    colorOnSecondary: { type: String },
    colorOnPrimaryVariant: { type: String },
    colorOnSecondaryVariant: { type: String },
    colorOnBackground: { type: String },
    colorOnSurface: { type: String },
    colorOnError: { type: String },
  },
});

module.exports = mongoose.model("Organization", organizationSchema);
