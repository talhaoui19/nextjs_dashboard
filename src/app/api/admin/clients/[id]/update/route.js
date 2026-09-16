import connectDB from "@/lib/db";
import Client from "@/models/Client";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      clientName,
      email,
      wilaya,
      phone,
      address,
      shippingClientName,
      shippingWilaya,
      shippingPhone,
      shippingAddress,
      avatar,
    } = body;

    const updatedClient = await Client.findByIdAndUpdate(
      params.id,
      {
        clientName,
        email,
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
      },
      { new: true },
    );

    if (!updatedClient) {
      return NextResponse.json(
        { message: "العميل غير موجود" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { data: updatedClient, message: "تم تحديث العميل بنجاح" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json(
      { message: "حدث خطأ في تحديث العميل" },
      { status: 500 },
    );
  }
}
