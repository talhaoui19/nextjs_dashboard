import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { clientId, items, shipping, paymentMethod } = body;

    if (!items || items.length === 0) {
      return Response.json(
        { error: "items مطلوبة" },
        { status: 400 }
      );
    }

    let totalPrice = 0;

    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return Response.json(
          { error: `المنتج ${item.productId} غير موجود` },
          { status: 404 }
        );
      }

      const discount = product.discount || 0;

      const finalPrice =
        product.price * (1 - discount / 100);

      totalPrice += finalPrice * item.quantity;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
      });
    }

    const order = new Order({
      clientId,
      items: orderItems,
      totalPrice,
      shipping,
      paymentMethod: paymentMethod || "كاش",
    });

    await order.save();
    await order.populate("items.productId");

    return Response.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}