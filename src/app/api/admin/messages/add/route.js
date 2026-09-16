import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Message from "@/models/Message";
import Client from "@/models/Client";
import { getAdmin } from "@/lib/data";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { clientId, text } = body;

    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json({ message: "غير مصرح لك" }, { status: 401 });
    }

    const client = await Client.findById(clientId);

    if (!client) {
      return NextResponse.json(
        { message: "العميل غير موجود" },
        { status: 404 },
      );
    }

    const newMessage = new Message({
      clientId,
      adminId: admin.id,
      sender: "admin",
      text: text.trim(),
    });

    await newMessage.save();

    return NextResponse.json(
      {
        data: newMessage,
        message: "تم إرسال الرسالة بنجاح",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating message:", error);

    return NextResponse.json(
      { message: "حدث خطأ في إرسال الرسالة" },
      { status: 500 },
    );
  }
}
