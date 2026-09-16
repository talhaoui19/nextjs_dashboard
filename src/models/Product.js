import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    categorie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorie",
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
