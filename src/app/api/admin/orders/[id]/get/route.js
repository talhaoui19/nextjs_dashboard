import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findById(id)
      .populate({
        path: "clientId",
        select: "clientName email phone shipping avatar",
      })
      .populate({
        path: "items.productId",
        select: "productName price images discount quantity",
      })
      .sort({ createdAt: -1 });

    if (!order) {
      return NextResponse.json({ message: "الطلب غير موجود" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error("Fetching Order Error :", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب الطلب" },
      { status: 500 },
    );
  }
}
