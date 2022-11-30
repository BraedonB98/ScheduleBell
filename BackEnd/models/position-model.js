const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const positionSchema = new Schema({
  organization: { type: mongoose.Types.ObjectId, ref: "Organization" },
  department: { type: String },
  title: { type: String },
  authCode: { type: String }, //number to assign to auth level
  priority: { type: String }, //primary location/position = 0
  employeeNumber: { type: String },
  payRate: { type: String },
  location: { type: mongoose.Types.ObjectId, ref: "Location" },
  notifications: { type: String }, //Notifications enabled for this job?
  employeeRating: { type: String }, //generated based on time at location, quality of work (survey employer x often),
  status: { type: String }, //active employed, maternal leave, suspended, terminated
  terminationReport: {
    terminated: { type: Boolean }, //True if terminated //!maybe remove, No termination report if not but maybe optimize by moving to slower storage on DB if true
    date: { type: String },
    reason: { type: String },
    type: { type: String }, //Fired, Resign, Quit(no notice)
  },
});

module.exports = mongoose.model("Position", positionSchema);
