const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  //User Information
  firstName: { type: String },
  lastName: { type: String },
  preferredName: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  biography: { type: String },
  imageUrl: { type: String },
  //Current Job Information
  positions: [{ type: mongoose.Types.ObjectId, ref: "Position" }],
  //Prior Job Information
  archivedPositions: [{ type: mongoose.Types.ObjectId, ref: "Position" }],
  //Scheduling (maybe later make this position specific)
  availability: [
    //!consider making this a model that is shared with schedule
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
  //System Settings/Flags
  updateProperties: [{ type: String }],
  notifications: [{ type: String }],
});

module.exports = mongoose.model("User", userSchema);
