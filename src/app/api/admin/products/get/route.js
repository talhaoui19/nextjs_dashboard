import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .populate("categorie", "categorieName")
      .lean();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب المنتجات" },
      { status: 500 },
    );
  }
}
