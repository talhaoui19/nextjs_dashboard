import connectDB from "@/lib/db";
import Coupon from "@/models/Coupon";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupons :", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب الكوبونات" },
      { status: 500 },
    );
  }
}
