import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    birthDate: {
      type: Date,
      default: null,
    },

    country: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "admin",
    },

    resetToken: {
      type: String,
      default: null,
    },

    resetTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
