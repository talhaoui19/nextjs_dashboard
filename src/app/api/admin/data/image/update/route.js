import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

export async function PUT(request) {
  try {
    await connectDB();

    const decodedToken = await verifyAdminToken();

    const { image } = await request.json();

    if (!image) {
      return new Response(JSON.stringify({ message: "الصورة مطلوبة." }), {
        status: 400,
      });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      decodedToken.id,
      { image: image.trim() },
      { new: true },
    );

    if (!updatedAdmin) {
      return new Response(
        JSON.stringify({ message: "لم يتم العثور على الادمين." }),
        { status: 404 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "تم تحديث الصورة بنجاح.",
        admin: updatedAdmin,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log("Updating Image Error:", error);
    return NextResponse.json(
      { message: "حدث خطأ في تحديث الصورة" },
      { status: 500 },
    );
  }
}
