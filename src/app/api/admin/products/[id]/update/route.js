import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
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

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
        productName,
        description,
        quantity: Number(quantity),
        price: Number(price),
        discount: Number(discount) || 0,
        brand,
        categorie,
        images,
      },
      { new: true },
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "المنتج غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { data: updatedProduct, message: "تم تحديث المنتج بنجاح" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "حدث خطأ في تحديث المنتج" },
      { status: 500 },
    );
  }
}
