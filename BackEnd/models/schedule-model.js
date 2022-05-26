const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  scheduleMonth: { type: Date },
  creationDate: { type: Date },
  editLog: [
    { type: Date, type: mongoose.Types.ObjectId, ref: "User", type: String },
  ],
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
  location: { type: mongoose.Types.ObjectId, ref: "Location" },
  status: { type: String }, //pending, active, archived
  calendar: [
    {
      day: { type: Date },
      sales: { type: String }, //eventually add ability to predict future sales
      customerExperience: { type: String }, //out of 5 to allow to algo to predict if sales go up or down
      notes: { type: String }, //add any special holidays (may effect scheduling)
      shifts: [
        {
          staff: { type: mongoose.Types.ObjectId, ref: "User" },
          startTime: { type: String }, //has to be after the previous shift endTime
          endTime: { type: String }, //has to be after start of shift
        },
      ], //if user has a split shift, put them in 2 shifts
    },
  ],
});

module.exports = mongoose.model("Schedule", scheduleSchema);
