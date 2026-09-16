"use client";
import { useState } from "react";
import { DateIcon } from "@/app/icons";
import DatePicker from "react-datepicker";
import { ar } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
registerLocale("ar", ar);

const EditCouponForm = ({ coupon }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    code: coupon.code,
    discountType: coupon.discountType,
    discountValue: coupon.discountValue,
    usageLimit: coupon.usageLimit,
    startDate: coupon.startDate ? new Date(coupon.startDate) : null,
    endDate: coupon.endDate ? new Date(coupon.endDate) : null,
    isActive: coupon.isActive,
  });

  const handleSubmit = async (eo) => {
    eo.preventDefault();

    const submitBtn = document.querySelector(
      'button[type="submit"][form="update-coupon-form"]',
    );
    if (submitBtn) submitBtn.innerHTML = '<div class="--spr"></div>';

    if (
      coupon.code === formData.code &&
      coupon.discountType === formData.discountType &&
      coupon.discountValue === formData.discountValue &&
      coupon.usageLimit === formData.usageLimit &&
      new Date(coupon.startDate).getTime() === formData.startDate?.getTime() &&
      new Date(coupon.endDate).getTime() === formData.endDate?.getTime() &&
      coupon.isActive === formData.isActive
    ) {
      toast.error("لم يتم أي تغيير في بيانات الكوبون !");
      submitBtn.textContent = "حفظ التغييرات";
      return;
    }

    try {
      const response = await fetch(`/api/admin/coupons/${coupon._id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("حدث خطأ أثناء تحديث الكوبون");
      }

      toast.success("تم تحديث الكوبون بنجاح");
      router.push("/dashboard/coupons");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تحديث الكوبون");
    } finally {
      if (submitBtn) submitBtn.textContent = "حفظ التغييرات";
    }
  };
  return (
    <form
      id="update-coupon-form"
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-6 w-full"
    >
      <div className="flex-1 space-y-6 w-full">
        {/* COUPON INFO */}
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">معلومات الكوبون</h2>

          <div className="relative w-full">
            <span className="--label">رمز الكوبون</span>
            <input
              type="text"
              placeholder="أدخل رمز الكوبون هنا"
              value={formData.code}
              onChange={(eo) =>
                setFormData({ ...formData, code: eo.target.value })
              }
              className="--input"
              required
            />
          </div>

          <div className="w-full mt-4">
            <span className="text-base font-semibold">نوع الكوبون</span>
            <div className="flex items-center gap-3 mt-3">
              {[
                { label: "نسبة مئوية", value: "percentage" },
                { label: "مبلغ ثابت", value: "fixed" },
                { label: "شحن مجاني", value: "free_shipping" },
              ].map((t) => (
                <div key={t.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="discountType"
                    value={t.value}
                    checked={formData.discountType === t.value}
                    onChange={(eo) =>
                      setFormData({
                        ...formData,
                        discountType: eo.target.value,
                      })
                    }
                    className="w-4 h-4 accent-[#f85555]"
                  />
                  <label className="text-sm text-[#232323]">{t.label}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            {formData.discountType !== "free_shipping" && (
              <div className="relative w-full">
                <span className="--label">قيمة الخصم</span>
                <input
                  type="number"
                  placeholder="أدخل قيمة الخصم هنا"
                  value={formData.discountValue}
                  onChange={(eo) =>
                    setFormData({ ...formData, discountValue: eo.target.value })
                  }
                  className="--input"
                />
                <span className="absolute left-4 top-3 text-(--main-color) text-sm">
                  {formData.discountType === "percentage"
                    ? "نسبة مئوية"
                    : "دينار جزائري"}
                </span>
              </div>
            )}
            <div className="relative w-full">
              <span className="--label">حد الاستخدام</span>
              <input
                type="number"
                placeholder="أدخل حد الاستخدام هنا"
                value={formData.usageLimit}
                onChange={(eo) =>
                  setFormData({ ...formData, usageLimit: eo.target.value })
                }
                className="--input"
                required
              />
              <span className="absolute left-4 top-3 text-(--main-color) text-sm">
                مرة/مرات
              </span>
            </div>
          </div>
        </div>
        {/* COUPON DATE */}
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-bold text-right">جدولة</h3>
          <span className="text-base text-[#9A9A9A]">
            استخدم هذه الإعدادات لتحديد تاريخ البداية والنهاية.
          </span>
          <div className="flex gap-2 mt-5">
            <div className="relative w-full">
              <DatePicker
                placeholderText="أدخل تاريخ البدء هنا"
                dateFormat="yyyy/MM/dd"
                selected={formData.startDate}
                onChange={(date) =>
                  setFormData({ ...formData, startDate: date })
                }
                className="--input"
                required
                locale="ar"
              />
              <span className="absolute bg-white px-2 right-6 -top-2.5 text-sm text-[#9A9A9A]">
                تاريخ البدء
              </span>
              <div className="absolute left-4 top-3.5">
                <DateIcon />
              </div>
            </div>

            <div className="relative w-full">
              <DatePicker
                placeholderText="أدخل تاريخ الانتهاء هنا"
                dateFormat="yyyy/MM/dd"
                selected={formData.endDate}
                onChange={(date) => setFormData({ ...formData, endDate: date })}
                className="--input"
                required
                locale="ar"
              />
              <span className="absolute bg-white px-2 right-6 -top-2.5 text-sm text-[#9A9A9A]">
                تاريخ الانتهاء
              </span>
              <div className="absolute left-4 top-3.5">
                <DateIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* COUPON STATUS */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div className="bg-white rounded-xl p-4">
          <h3 className="text-lg font-bold mb-3 text-right">حالة الكوبون</h3>
          <div className="mt-2 space-y-3 px-2">
            {[
              { label: "مفعل", value: true },
              { label: "معطل", value: false },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="isActive"
                  value={s.value}
                  checked={formData.isActive === s.value}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      isActive: s.value,
                    })
                  }
                  className="w-4 h-4 accent-[#f85555]"
                />
                <label className="text-sm text-[#232323]">{s.label}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditCouponForm;
