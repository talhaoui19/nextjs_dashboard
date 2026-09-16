"use client";

import { DeleteIcon, EditIcon } from "@/app/icons";
import Link from "next/link";
import { DeletePopup } from "../../ui";
import { useState } from "react";

const CouponRow = ({ coupon, index }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const nowDate = new Date();

  const isExpired = new Date(coupon.endDate) <= nowDate;
  const isScheduled = new Date(coupon.startDate) > nowDate;
  return (
    <>
      <tr>
        <td className="p-4">{index + 1}</td>
        <td className="p-4 text-[#232323]">
          <span className="bg-[#F9F9F9] py-2 px-4 rounded-md">
            {coupon.code}
          </span>
        </td>
        <td className="p-4">
          {coupon.discountType === "percentage"
            ? "نسبة مئوية"
            : coupon.discountType === "fixed"
              ? "مبلغ ثابت"
              : "شحن مجاني"}
        </td>
        <td className="p-4">
          {coupon.discountType === "free_shipping"
            ? "/"
            : `${coupon.discountValue} ${
                coupon.discountType === "percentage" ? "%" : "دج"
              }`}
        </td>
        <td className="p-4">
          <span
            className={`py-2 px-4 ${
              isExpired
                ? "bg-[#FCECD6] text-[#ED6C3C]"
                : isScheduled
                  ? "bg-[#E1FDFD] text-[#3E77B0]"
                  : coupon.isActive
                    ? "bg-[#E7F7ED] text-[#088B3A]"
                    : !coupon.isActive
                      ? "bg-[#FEFCDD] text-[#B2A23F]"
                      : ""
            } rounded-md`}
          >
            {isExpired
              ? "انتهى"
              : isScheduled
                ? "مجدول"
                : coupon.isActive
                  ? "ممكن"
                  : !coupon.isActive
                    ? "غير ممكن"
                    : ""}
          </span>
        </td>
        <td className="p-4 font-medium">
          <span className="bg-[#F9F9F9] py-2 px-4 rounded-md">
            {new Date(coupon.startDate).toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
              numberingSystem: "latn",
            })}
          </span>
        </td>
        <td className="p-4 font-medium">
          <span className="bg-[#F9F9F9] py-2 px-4 rounded-md">
            {new Date(coupon.endDate).toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
              numberingSystem: "latn",
            })}
          </span>
        </td>

        <td className="flex items-center gap-2 p-4 space-x-2 rtl:space-x-reverse">
          <Link
            href={`/dashboard/coupons/${coupon._id}/edit_coupon`}
            className="--edit-but"
          >
            <EditIcon />
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsDeleting(true);
            }}
            className="--delete-but"
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
      <DeletePopup
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        itemIdType={"coupons"}
        itemId={coupon._id}
        title="هذا الكوبون"
      />
    </>
  );
};

export default CouponRow;
