import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await connectDB();

    const decodedToken = await verifyAdminToken();

    const { currentPassword, newPassword, confirmPassword } =
      await request.json();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return new Response(JSON.stringify({ message: "جميع الحقول مطلوبة." }), {
        status: 400,
      });
    }

    if (newPassword !== confirmPassword) {
      return new Response(
        JSON.stringify({
          message: "كلمة المرور الجديدة و تأكيدها غير متطابقين !",
        }),
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return new Response(
        JSON.stringify({
          message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل.",
        }),
        { status: 400 },
      );
    }

    const admin = await Admin.findById(decodedToken.id);

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      admin.password,
    );

    if (!isPasswordCorrect) {
      return new Response(
        JSON.stringify({ message: "كلمة المرور القديمة غير صحيحة !" }),
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    return new Response(
      JSON.stringify({ message: "تم تحديث كلمة المرور بنجاح." }),
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
