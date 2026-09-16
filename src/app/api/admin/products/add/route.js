import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/lib/db";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      productName,
      description,
      quantity,
      price,
      discount,
      brand,
      categorie,
      images,
    } = body;

    const newProduct = new Product({
      productName: productName,
      description: description,
      quantity: Number(quantity),
      price: Number(price),
      discount: Number(discount) || 0,
      brand: brand,
      categorie,
      images,
    });

    await newProduct.save();

    return NextResponse.json(
      { data: newProduct, message: "تم إضافة المنتج بنجاح" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "حدث خطأ في إضافة المنتج" },
      { status: 500 },
    );
  }
}
