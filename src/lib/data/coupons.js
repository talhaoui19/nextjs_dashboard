import "server-only";

import connectDB from "../db";
import Coupon from "@/models/Coupon";
import { serialize } from "../serialize";

export async function getCoupons() {
  await connectDB();

  const coupons = await Coupon.find().lean();

  return serialize(coupons);
}

export async function getCoupon(id) {
  await connectDB();

  const coupon = await Coupon.findById(id).lean();

  return serialize(coupon);
}
