import "server-only";

import connectDB from "../db";
import Message from "@/models/Message";
import { verifyAdminToken } from "../auth";
import { Types } from "mongoose";
import { serialize } from "../serialize";

export async function getMessagesByClient(clientId) {
  await connectDB();

  const messages = await Message.find({
    clientId,
  })
    .sort({ createdAt: 1 })
    .lean();

  return serialize(messages);
}

export async function getLatestMessages() {
  try {
    const { id } = await verifyAdminToken();

    await connectDB();

    const messages = await Message.aggregate([
      {
        $match: {
          adminId: new Types.ObjectId(id),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: "$clientId",
          text: { $first: "$text" },
          sender: { $first: "$sender" },
          createdAt: { $first: "$createdAt" },
        },
      },
    ]);

    return serialize(messages);
  } catch (error) {
    console.error("Error fetching latest messages:", error);
    return [];
  }
}
