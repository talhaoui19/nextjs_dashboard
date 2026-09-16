import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate({
        path: "clientId",
        select: "clientName email phone address",
      })
      .populate({
        path: "items.productId",
        select: "productName price image discount quantity",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders :", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب الطلبات" },
      { status: 500 },
    );
  }
}
