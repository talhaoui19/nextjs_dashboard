import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema(
  {
    categorieName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Categorie ||
  mongoose.model("Categorie", categorieSchema);
