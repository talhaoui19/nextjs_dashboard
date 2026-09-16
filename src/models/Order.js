import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      default: "قيد الانتظار",
    },

    paymentMethod: {
      type: String,
      enum: ["كاش", "بطاقة", "تحويل بنكي"],
      default: "كاش",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
