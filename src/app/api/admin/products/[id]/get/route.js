import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const product = await Product.findById(id).populate(
      "categorie",
      "categorieName",
    );

    if (!product) {
      return NextResponse.json(
        { message: "المنتج غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب المنتج" },
      { status: 500 },
    );
  }
}
