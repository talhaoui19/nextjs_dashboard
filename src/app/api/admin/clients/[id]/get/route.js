import connectDB from "@/lib/db";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json(
        { message: "العميل غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json({ client }, { status: 200 });
  } catch (error) {
    console.error("Error fetching client :", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب العميل" },
      { status: 500 },
    );
  }
}
