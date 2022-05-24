const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  preferredName: { type: String },
  jobCode: { type: String },
  imageUrl: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  password: { type: String },
  primaryLocation:{ type: mongoose.Types.ObjectId, ref: "Location" },
  payRate:{type:String},
  availability: [{type:String}],
});

module.exports = mongoose.model("User", userSchema);
