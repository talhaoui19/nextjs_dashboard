import "server-only";

import connectDB from "../db";
import Client from "@/models/Client";
import Order from "@/models/Order";
import { serialize } from "../serialize";

export async function getClients() {
  await connectDB();

  const clients = await Client.find().lean();

  return serialize(clients);
}

export async function getClient(id) {
  await connectDB();

  const client = await Client.findById(id).lean();

  return serialize(client);
}

export async function getOrdersByClient(id) {
  await connectDB();

  const orders = await Order.find({
    clientId: id,
  })
    .populate("clientId")
    .populate("items.productId")
    .lean();

  return serialize(orders);
}
