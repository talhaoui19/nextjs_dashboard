import { NextResponse } from "next/server";
import Categorie from "@/models/Categorie";
import connectDB from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const categorie = await Categorie.findByIdAndDelete(id);

    if (!categorie) {
      return NextResponse.json(
        { message: "الفئة غير موجودة" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "تم حذف الفئة بنجاح" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting category :", error);
    return NextResponse.json(
      { message: "حدث خطأ في حذف المنتج" },
      { status: 500 },
    );
  }
}
