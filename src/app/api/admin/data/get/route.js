import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

export async function GET(request) {
  try {
    await connectDB();

    const decodedToken = await verifyAdminToken();

    const admin = await Admin.findById(decodedToken.id).select("-password");

    if (!admin) {
      return new Response(JSON.stringify({ message: "المسؤول غير موجود." }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        admin: {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          image: admin.image,
          email: admin.email,
          birthDate: admin.birthDate,
          country: admin.country,
          phone: admin.phone,
          address: admin.address,
        },
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log("Admin Data Error:", error);
    return NextResponse.json(
      { message: "حدث خطأ في جلب بيانات الأدمين" },
      { status: 500 },
    );
  }
}
