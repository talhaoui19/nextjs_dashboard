import connectDB from "@/lib/db";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const clients = await Client.find().lean();

    return NextResponse.json({ clients }, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients :", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب العملاء" },
      { status: 500 },
    );
  }
}
