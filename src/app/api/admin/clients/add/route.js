import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import Client from "@/models/Client";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      clientName,
      email,
      password,
      confirmPassword,
      wilaya,
      phone,
      address,
      shippingClientName,
      shippingWilaya,
      shippingPhone,
      shippingAddress,
      avatar,
    } = body;

    await connectDB();

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "كلمتا المرور غير متطابقتين" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newClient = new Client({
      clientName,
      email,
      password: hashedPassword,
      wilaya,
      phone,
      address,
      shipping: {
        clientName: shippingClientName,
        wilaya: shippingWilaya,
        phone: shippingPhone,
        address: shippingAddress,
      },
      avatar,
    });

    await newClient.save();

    return NextResponse.json(
      { data: newClient, message: "تم إضافة العميل بنجاح" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating client :", error);
    return NextResponse.json(
      { message: "حدث خطأ في إضافة العميل" },
      { status: 500 },
    );
  }
}
