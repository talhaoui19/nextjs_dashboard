import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { clientId, items, shipping, paymentMethod } = body;

    if (!items || items.length === 0) {
      return Response.json({ error: "items مطلوبة" }, { status: 400 });
    }

    const totalPrice = items.reduce((sum, item) => {
      const discount = item.discount || 0;
      const finalPrice = item.price * (1 - discount / 100);

      return sum + finalPrice * item.quantity;
    }, 0);

    const order = new Order({
      clientId,
      items,
      totalPrice,
      shipping,
      paymentMethod: paymentMethod || "cash",
    });

    await order.save();
    await order.populate("items.productId");

    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
