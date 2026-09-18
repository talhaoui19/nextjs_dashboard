import "server-only";

import connectDB from "@/lib/db";
import Admin from "@/models/Admin";
import { verifyAdminToken } from "../auth";
import { serialize } from "../serialize";

export async function getAdmin() {
  try {
    const decodedToken = await verifyAdminToken();

    await connectDB();

    const admin = await Admin.findById(decodedToken.id).lean();

    return serialize(admin);
  } catch (error) {
    return null;
  }
}
