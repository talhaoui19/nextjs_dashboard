import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate({
        path: "clientId",
        select: "clientName email phone avatar",
      })
      .populate({
        path: "items.productId",
        select: "productName price images discount",
      })
      .sort({ createdAt: -1 })
      .limit(5);

    return Response.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest orders:", error);

    return Response.json(
      { error: "حدث خطأ في جلب آخر الطلبات" },
      { status: 500 },
    );
  }
}
