import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("adminToken");

    return new Response(JSON.stringify({ message: "تم تسجيل الخروج بنجاح." }), {
      status: 200,
    });
  } catch (error) {
    console.log("Lougout Error:", error);
    return new Response(
      JSON.stringify({ message: "Server Error :", error: error.message }),
      { status: 500 },
    );
  }
}
