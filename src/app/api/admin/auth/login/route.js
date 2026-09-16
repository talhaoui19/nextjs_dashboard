import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: "البريد الالكتروني و كلمة المرور مطلوبان .",
        }),
        { status: 400 },
      );
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return new Response(
        JSON.stringify({
          message: "يرجى إدخال بريد إلكتروني صالح.",
        }),
        { status: 401 },
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ message: " كلمة المرور غير صحيحة ." }),
        { status: 401 },
      );
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const cookieStore = await cookies();
    cookieStore.set({
      name: "adminToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message: "تم تسجيل الدخول بنجاح.",
        admin: {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log("Login Error:", error);
    return new Response(
      JSON.stringify({ message: "Server Error :", error: error.message }),
      { status: 500 },
    );
  }
}
