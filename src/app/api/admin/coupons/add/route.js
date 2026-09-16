import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Coupon from "@/models/Coupon";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      code,
      discountType,
      discountValue,
      usageLimit,
      startDate,
      endDate,
      isActive,
    } = body;

    const newCoupon = new Coupon({
      code,
      discountType,
      discountValue:
        discountType === "free_shipping" ? 0 : Number(discountValue),
      usageLimit: Number(usageLimit),
      startDate,
      endDate,
      isActive: Boolean(isActive),
    });

    await newCoupon.save();

    return NextResponse.json(
      { data: newCoupon, message: "تم إضافة الكوبون بنجاح" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating coupon :", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}
