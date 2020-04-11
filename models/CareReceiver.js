const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = require("./Order")
const CareGiver = require("./CareGiver")

const careReceiverSchema = new Schema({
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  trustedGivers: [{ type: Schema.Types.ObjectId, ref: "CareGiver" }],
  emergencyContact: String,
  preferredShoppingPlaces: [String],
  spokenLanguage: String,
});

const CareReceiver = mongoose.model("CareReceiver", careReceiverSchema);
module.exports = CareReceiver;
