import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return NextResponse.json({ message: "الطلب غير موجود" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "تم حذف الطلب بنجاح ." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Deleting Order Error :", error);
    return NextResponse.json({ message: "حدث خطأ في الحذف" }, { status: 500 });
  }
}
