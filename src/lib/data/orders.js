import "server-only";

import connectDB from "../db";
import Order from "@/models/Order";
import { serialize } from "../serialize";

export async function getOrders() {
  await connectDB();

  const orders = await Order.find()
    .populate("clientId")
    .populate("items.productId")
    .lean();

  return serialize(orders);
}

export async function getOrder(id) {
  await connectDB();

  const order = await Order.findById(id)
    .populate("clientId")
    .populate("items.productId")
    .lean();
  return serialize(order);
}

export async function getLatestOrders() {
  await connectDB();

  const orders = await Order.find()
    .populate("clientId")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return serialize(orders);
}
