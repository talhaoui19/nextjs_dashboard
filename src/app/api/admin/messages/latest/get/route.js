import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Message from "@/models/Message";
import { getAdmin } from "@/lib/data";
import { Types } from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json({ message: "غير مصرح لك" }, { status: 401 });
    }

    const messages = await Message.aggregate([
      {
        $match: {
          adminId: new Types.ObjectId(admin.id),
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

    return NextResponse.json(
      {
        data: messages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching latest messages:", error);

    return NextResponse.json(
      { message: "حدث خطأ في جلب آخر الرسائل" },
      { status: 500 },
    );
  }
}
