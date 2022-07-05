const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  preferredName: { type: String },
  employeeNumber: { type: String },
  position: { type: String },
  imageUrl: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  organization: { type: mongoose.Types.ObjectId, ref: "Organization" },
  primaryLocation: { type: mongoose.Types.ObjectId, ref: "Location" },
  alternateLocations: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
  payRate: { type: String },
  availability: [
    {
      date: { type: Date }, //sorted in order //!if more than a month old delete to save room
      time: [
        {
          start: { type: Number },
          end: { type: Number },
        },
      ],
    },
  ],
  updateProperties: [{ type: String }],
  notifications: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
