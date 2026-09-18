import "server-only";

import connectDB from "../db";
import Categorie from "@/models/Categorie";
import { serialize } from "../serialize";

export async function getCategories() {
  await connectDB();

  const categorie = await Categorie.find().lean();

  return serialize(categorie);
}
