const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careReceiverSchema = new Schema({
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  trustedGivers: [{ type: Schema.Types.ObjectId, ref: "CareGiver" }],
  spokenLanguages: [String],
  emergencyContact: String,
  preferredShoppingPlaces: [String],
  spokenLanguage: String,
  vulnerability: {
    type: String,
    enum: ["SENIOR", "SICK", "PREGNANT", "REDUCED_MOBILITY", "BLIND", "OTHER"],
  },
});

const CareReceiver = mongoose.model("CareReceiver", careReceiverSchema);
module.exports = CareReceiver;
