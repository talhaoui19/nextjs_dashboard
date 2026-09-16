"use client";

import { useState } from "react";
import { AddCouponForm } from "@/app/components/dashboard/add_coupon";
import { FormActions, HeaderSection } from "@/app/components/ui";

export default function AddCouponPage() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
        <HeaderSection title={"الكوبونات"} subtitle={"اضافة كوبون"} />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <AddCouponForm setIsLoading={setIsLoading} />
        </div>
      </div>

      <FormActions
        isLoading={isLoading}
        formId="add-coupon-form"
        cancelHref="/dashboard/coupons"
        submitText="إضافة الكوبون"
      />
    </>
  );
}
