import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import Admin from "@/models/Admin";

export async function DELETE(request) {
  try {
    await connectDB();

    const decodedToken = await verifyAdminToken();

    const updatedAdmin = await Admin.findByIdAndUpdate(
      decodedToken.id,
      { image: "" },
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
        message: "تم حذف الصورة بنجاح.",
        admin: updatedAdmin,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log("Deleting Image Error:", error);
    return NextResponse.json(
      { message: "حدث خطأ في حذف الصورة" },
      { status: 500 },
    );
  }
}
