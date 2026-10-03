import "server-only";

import connectDB from "../db";

import Categorie from "@/models/Categorie";

import { serialize } from "../serialize";

export async function getCategories() {
  await connectDB();

  const categories = await Categorie.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "categorie",
        as: "products",
      },
    },
    {
      $addFields: {
        productsCount: { $size: "$products" },
      },
    },
    {
      $project: {
        products: 0,
      },
    },
  ]);

  return serialize(categories);
}