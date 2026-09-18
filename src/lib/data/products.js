import "server-only";

import connectDB from "../db";
import Product from "@/models/Product";
import Categorie from "@/models/Categorie";

export async function getProducts() {
  await connectDB();

  return Product.find()
    .populate("categorie")
    .lean()
    .then((data) => JSON.parse(JSON.stringify(data)));
}

export async function getProduct(id) {
  await connectDB();

  return Product.findById(id)
    .populate("categorie")
    .lean()
    .then((data) => JSON.parse(JSON.stringify(data)));
}

export async function getProductsByCategorie(id) {
  await connectDB();

  const categorie = await Categorie.findById(id)
    .lean()
    .then((data) => JSON.parse(JSON.stringify(data)));

  if (!categorie) {
    return {
      categorie: null,
      products: [],
    };
  }

  const products = await Product.find({
    categorie: id,
  })
    .populate("categorie")
    .lean()
    .then((data) => JSON.parse(JSON.stringify(data)));

  return {
    categorie,
    products,
  };
}
