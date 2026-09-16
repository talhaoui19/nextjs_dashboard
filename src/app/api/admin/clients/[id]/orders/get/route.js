import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const orders = await Order.find({ clientId: id })
      .populate({
        path: "items.productId",
        select: "productName price images discount quantity",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching client orders:", error);

    return NextResponse.json(
      { message: "حدث خطأ في جلب طلبات العميل" },
      { status: 500 },
    );
  }
}
