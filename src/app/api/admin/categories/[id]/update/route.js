import { NextResponse } from "next/server";
import Categorie from "@/models/Categorie";
import connectDB from "@/lib/db";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();
    const { categorieName } = body;

    if (!categorieName) {
      return NextResponse.json({ message: "اسم الفئة مطلوب" }, { status: 400 });
    }

    await connectDB();

    const categorie = await Categorie.findByIdAndUpdate(
      id,
      { categorieName: categorieName.trim() },
      { new: true, runValidators: true },
    );

    if (!categorie) {
      return NextResponse.json(
        { message: "الفئة غير موجودة" },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: categorie }, { status: 200 });
  } catch (error) {
    console.error("Error updating categorie :", error);
    return NextResponse.json(
      { message: "حدث خطأ في التعديل" },
      { status: 500 },
    );
  }
}
