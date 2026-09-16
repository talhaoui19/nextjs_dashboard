import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Message from "@/models/Message";
import { getAdmin } from "@/lib/data";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { clientId } = await params;

    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json({ message: "غير مصرح لك" }, { status: 401 });
    }

    const messages = await Message.find({
      clientId,
      adminId: admin.id,
    })
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json(
      {
        data: messages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching messages:", error);

    return NextResponse.json(
      { message: "حدث خطأ في جلب الرسائل" },
      { status: 500 },
    );
  }
}
