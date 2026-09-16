import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    sender: {
      type: String,
      enum: ["admin", "client"],
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Message ||
  mongoose.model("Message", messageSchema);
