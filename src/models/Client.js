import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    wilaya: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    shipping: {
      clientName: {
        type: String,
        required: true,
        trim: true,
      },

      wilaya: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Client || mongoose.model("Client", clientSchema);
