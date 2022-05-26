const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: { type: String },
  scheduleMonth: { type: Date },
  creationDate: { type: Date },
  editLog: [
    { type: Date, type: mongoose.Types.ObjectId, ref: "User", type: String },
  ],
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
  location: { type: mongoose.Types.ObjectId, ref: "Location" },
  notes: { type: String },
  status: { type: String }, //pending, active, archived
  calendar: [
    {
      day: { type: day },
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
