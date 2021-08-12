const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: String,
  amount: Number,
});

const orderSchema = new Schema({
  preferredMethod: {
    type: String,
    enum: ["CALL", "APP"],
  },
  status: {
    type: String,
    enum: ["OPEN", "IN_PROGRESS", "DELIVERED", "CANCELLED", "DELETED"],
  },
  ingredientList: [String],
  groceryListImage: String, // cloudinary? config a faire. Ici cette image concerne a la liste demandée par le careReceiver
  recording: String,
  receiptImage: String, //cloudinary? config a faire. Ici cette image concernerait pourquoi pas une photo du recu de courses par le careGiver
  deliveryDate: String,
  deliveryTime: String,
  carerId: { type: Schema.Types.ObjectId, ref: "CareGiver" },
  receiverId: { type: Schema.Types.ObjectId, ref: "CareReceiver" },
  additionalComments: String,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
