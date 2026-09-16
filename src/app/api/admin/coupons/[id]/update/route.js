import connectDB from "@/lib/db";
import Coupon from "@/models/Coupon";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
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

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      params.id,
      {
        code,
        discountType,
        discountValue:
          discountType === "free_shipping" ? 0 : Number(discountValue),
        usageLimit: Number(usageLimit),
        startDate,
        endDate,
        isActive: Boolean(isActive),
      },
      { new: true },
    );

    if (!updatedCoupon) {
      return NextResponse.json(
        { message: "الكوبون غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { data: updatedCoupon, message: "تم تحديث الكوبون بنجاح" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating product :", error);
    return NextResponse.json(
      { message: "حدث خطأ في تحديث الكوبون" },
      { status: 500 },
    );
  }
}
