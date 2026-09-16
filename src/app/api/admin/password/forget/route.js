import nodemailer from "nodemailer";
import crypto from "crypto";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "7af5aa002@smtp-brevo.com",
    pass: process.env.BREVO_API_KEY,
  },
});

export async function POST(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({
          message: "البريد الإلكتروني مطلوب.",
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

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000;

    admin.resetToken = resetToken;
    admin.resetTokenExpiry = resetTokenExpiry;
    await admin.save();

    const resetLink = `${process.env.NEXT_PUBLIC_URL}/reset_password?token=${resetToken}&email=${email}`;

    await transporter.sendMail({
      from: " إعادة تعيين كلمة المرور <talhaoui.sabir@gmail.com>",
      to: email,
      subject: "إعادة تعيين كلمة المرور",
      html: `
        <div style="direction: rtl; text-align: center; font-family: Arial, sans-serif;">
          <h2 style="color: #333;">طلب إعادة تعيين كلمة المرور</h2>
          <p>مرحباً ${admin.fullName}،</p>
          <p>لقد طلبت إعادة تعيين كلمة المرور الخاصة بك.</p>
          <p style="margin-top: 20px;">اضغط على الزر أدناه:</p>
          <a href="${resetLink}" style="background-color: #fe6f67; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">
            إعادة تعيين كلمة المرور
          </a>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">
             هذا الرابط سيكون صالحاً لمدة <strong>ساعة واحدة</strong> فقط.
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({
        message: "تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log("Error:", error.message);
    return new Response(
      JSON.stringify({ message: "خطأ في السيرفر", error: error.message }),
      { status: 500 },
    );
  }
}
