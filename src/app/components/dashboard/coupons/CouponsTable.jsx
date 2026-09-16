"use client";
import { useCoupons } from "@/app/dashboard/context/CouponsContext";
import { CouponRow } from ".";
import { EmptyTableRow, Pagination } from "../../ui";
import { useSearchPagination } from "@/hooks";

export default function CouponsTable({ searchQuery = "" }) {
  const { coupons } = useCoupons();

  const {
    currentItems: currentCoupons,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredItems,
  } = useSearchPagination({
    items: coupons,
    searchQuery,
    itemsPerPage: 10,

    searchFn: (coupon, query) => {
      const couponCode = coupon.code.toLowerCase();

      const discountType =
        coupon.discountType === "percentage"
          ? "نسبة مئوية"
          : coupon.discountType === "fixed"
            ? "مبلغ ثابت"
            : "شحن مجاني";

      const nowDate = new Date();

      const isExpired = new Date(coupon.endDate) <= nowDate;
      const isScheduled = new Date(coupon.startDate) > nowDate;

      const status = isExpired
        ? "انتهى"
        : isScheduled
          ? "مجدول"
          : coupon.isActive
            ? "ممكن"
            : "غير ممكن";

      const startDate = new Date(coupon.startDate).toLocaleDateString("ar-DZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
        numberingSystem: "latn",
      });

      const endDate = new Date(coupon.endDate).toLocaleDateString("ar-DZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
        numberingSystem: "latn",
      });

      return (
        couponCode.includes(query) ||
        discountType.includes(query) ||
        status.includes(query) ||
        startDate.includes(query) ||
        endDate.includes(query)
      );
    },
  });
  return (
    <>
      <table className="min-w-full table-fixed bg-white text-sm rtl:text-right text-left">
        <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
          <tr>
            {[
              "#",
              "الرمز",
              "النوع",
              "خصم",
              "الحالة",
              "تاريخ البدء",
              "تاريخ الانتهاء",
              "الإجراء",
            ].map((col) => (
              <th className="px-4 py-2 text-sm text-[#6C6C6C] text-start">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {currentCoupons.length === 0 ? (
            <EmptyTableRow
              colSpan={8}
              message="لا توجد كوبونات بعد."
              description="لم تقم بإنشاء أي كوبون حتى الآن."
            />
          ) : (
            currentCoupons.map((coupon, index) => (
              <CouponRow
                key={coupon._id}
                coupon={coupon}
                index={(currentPage - 1) * 10 + index}
              />
            ))
          )}
        </tbody>
      </table>
      {filteredItems.length > 10 && (
        <Pagination
          totalPages={Math.ceil(coupons.length / 10)}
          totalItems={coupons.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
}
