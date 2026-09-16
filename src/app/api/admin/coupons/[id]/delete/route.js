import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Coupon from "@/models/Coupon";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return NextResponse.json(
        { message: "الكوبون غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "تم حذف الكوبون بنجاح ." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting coupon :", error);
    return NextResponse.json({ message: "حدث خطأ في الحذف" }, { status: 500 });
  }
}
