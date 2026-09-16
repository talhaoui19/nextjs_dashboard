import connectDB from "@/lib/db";
import Categorie from "@/models/Categorie";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { categorieName } = body;

    if (!categorieName || !categorieName.trim()) {
      return Response.json(
        {
          success: false,
          message: "اسم الفئة مطلوب",
        },
        { status: 400 },
      );
    }

    const existingCategory = await Categorie.findOne({
      categorieName: categorieName.trim(),
    });

    if (existingCategory) {
      return Response.json(
        {
          success: false,
          message: "هذه الفئة موجودة بالفعل",
        },
        { status: 409 },
      );
    }

    const category = await Categorie.create({
      categorieName: categorieName.trim(),
    });

    return Response.json(
      {
        success: true,
        message: "تم إنشاء الفئة بنجاح",
        category: {
          ...category.toObject(),
          productsCount: 0,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create category error:", error);

    return Response.json(
      {
        success: false,
        message: "حدث خطأ أثناء إنشاء الفئة",
      },
      { status: 500 },
    );
  }
}
