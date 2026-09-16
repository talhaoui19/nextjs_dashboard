import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function verifyAdminToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("adminToken")?.value;

  if (!token) {
    throw {
      status: 401,
      message: "غير مصرح. يرجى تسجيل الدخول.",
    };
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw {
      status: 401,
      message: "الرمز غير صالح أو انتهت صلاحيته.",
    };
  }
}