import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

export async function PUT(request) {
  try {
    await connectDB();

    const decodedToken = await verifyAdminToken();

    const { firstName, lastName, birthDate, country, phone, address } =
      await request.json();

    const admin = await Admin.findById(decodedToken.id);

    const updatedAdmin = await Admin.findByIdAndUpdate(
      decodedToken.id,
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthDate: new Date(birthDate),
        country: country.trim(),
        phone: phone.trim(),
        address: address.trim(),
      },
      { new: true },
    );

    return new Response(
      JSON.stringify({
        message: "تم تحديث البيانات بنجاح.",
        admin: updatedAdmin,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log("`Updating Admin Data Error:", error);
    return NextResponse.json(
      { message: "حدث خطأ في  تحديث البيانات" },
      { status: 500 },
    );
  }
}
