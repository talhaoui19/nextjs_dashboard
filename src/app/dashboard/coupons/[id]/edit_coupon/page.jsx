import { EditCouponForm } from "@/app/components/dashboard/edit_coupon";
import { FormActions, HeaderSection } from "@/app/components/ui";
import { getCoupon } from "@/lib/data";

export default async function EditCouponPage({ params }) {
  const { id } = await params;
  const coupon = await getCoupon(id);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
        <HeaderSection title={"الكوبونات"} subtitle={"تعديل كوبون"} />
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <EditCouponForm coupon={coupon} />
        </div>
      </div>

      <FormActions
        formId="update-coupon-form"
        cancelHref="/dashboard/coupons"
        submitText="حفظ التغييرات"
      />
    </>
  );
}
