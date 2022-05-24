const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: { type: String },
  scheduleMonth: {type: Date},
  creationDate: { type: Date },
  editLog: [
    { type: Date, type: mongoose.Types.ObjectId, ref: "User", type: String },
  ],
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
  location: { type: mongoose.Types.ObjectId, ref: "Location" },
  notes: { type: String },
  status: {type:String}, //pending, active, archived
});

module.exports = mongoose.model("Schedule", scheduleSchema);
