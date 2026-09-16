import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { message: "المنتج غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "تم حذف المنتج بنجاح ." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ message: "حدث خطأ في الحذف" }, { status: 500 });
  }
}
