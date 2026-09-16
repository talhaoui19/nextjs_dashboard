import connectDB from "@/lib/db";
import Categorie from "@/models/Categorie";

export async function GET() {
  try {
    await connectDB();

    const categories = await Categorie.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categorie",
          as: "products",
        },
      },
      {
        $addFields: {
          productsCount: {
            $size: "$products",
          },
        },
      },
      {
        $project: {
          products: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return Response.json(
      {
        success: true,
        categories,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get categories error:", error);

    return Response.json(
      {
        success: false,
        message: "حدث خطأ أثناء جلب الفئات",
      },
      { status: 500 },
    );
  }
}
