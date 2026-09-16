import connectDB from "@/lib/db";
import Categorie from "@/models/Categorie";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const categorie = await Categorie.findById(id);
    if (!categorie) {
      return NextResponse.json(
        { success: false, message: "الفئة غير موجودة" },
        { status: 404 },
      );
    }

    const products = await Product.find({ categorie: id })
      .populate("categorie", "categorieName")
      .lean();

    return NextResponse.json(
      {
        success: true,
        categorie: {
          id: categorie._id,
          categorieName: categorie.categorieName,
          productsCount: products.length,
        },
        products,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching categorie products :", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ في جلب المنتجات" },
      { status: 500 },
    );
  }
}
