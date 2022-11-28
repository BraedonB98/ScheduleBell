const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const colorSchema = new Schema({
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
});

module.exports = mongoose.model("Color", colorSchema);
