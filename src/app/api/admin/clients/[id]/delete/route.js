import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Client from "@/models/Client";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const client = await Client.findByIdAndDelete(id);

    if (!client) {
      return NextResponse.json(
        { message: "العميل غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "تم حذف العميل بنجاح ." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting client :", error);
    return NextResponse.json({ message: "حدث خطأ في الحذف" }, { status: 500 });
  }
}
