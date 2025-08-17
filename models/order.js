const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = mongoose.Schema({
  number: {
    type: Number,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: String,
    // required: true,
  },
  status: {
    type: String,
    required: true,
    default: "0",
  },
  status: {
    type: String,
    // required: true,
    default: "Pending",
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});
// Add the auto-increment plugin to your schema
orderSchema.plugin(AutoIncrement, { inc_field: "number" });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;