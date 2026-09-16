import connectDB from "@/lib/db";
import Coupon from "@/models/Coupon";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return NextResponse.json(
        { message: "الكوبون غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json({ coupon }, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupon :", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب الكوبون" },
      { status: 500 },
    );
  }
}
