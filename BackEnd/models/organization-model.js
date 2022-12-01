const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String },
  purposeStatement: { type: String },
  authCodes: {
    //position permissions
    master: [{ type: String }], //all rights
    imgaeUrl: [{ type: String }],
    colorScheme: [{ type: String }],
    subscription: [{ type: String }],
    purposeStatement: [{ type: String }],
    locations: [{ type: String }], //will have auth for all location changes(ie each store all auth)
    auth: [{ type: String }],
    delete: [{ type: String }], //should set a delay request to allow for manual cancel of deletion(rogue employee)
  }, //(also required to be assigned to organization)
  imageUrl: { type: String },
  subscription: { type: String }, //Trial, (then subscription options), DevApproved(free but full feature)
  notes: { type: String },
  locations: [{ type: mongoose.Types.ObjectId, ref: "Location" }], //location 0 is corporate staff
  organizationColorScheme: { type: mongoose.Types.ObjectId, ref: "Color" },
});

module.exports = mongoose.model("Organization", organizationSchema);
