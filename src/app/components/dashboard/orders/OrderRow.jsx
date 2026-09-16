"use client";

import { useState } from "react";
import { DeleteIcon, InfoIcon } from "@/app/icons";
import Link from "next/link";
import { DeletePopup } from "../../ui";

const RequestRow = ({ order, index }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <tr>
        <td className="p-4">{index + 1}</td>
        <td className="p-4 font-medium">
          ORD-{order._id.slice(0, 4).toUpperCase()}
        </td>
        <td className="p-4 font-medium">
          <span className="bg-[#F9F9F9] py-2 px-4 rounded-md">
            {new Date(order.createdAt).toLocaleDateString("ar-DZ", {
              year: "numeric",
              month: "long",
              day: "numeric",
              numberingSystem: "latn",
            })}
          </span>
        </td>
        <td className="p-4">{order.clientId.clientName}</td>
        <td className="p-4">{order.items.length}</td>
        <td className="p-4">
          <span
            className={`py-2 px-4 rounded-md ${
              order.status === "تم التسليم"
                ? "bg-[#e7f7ed] text-[#088B3A]"
                : "bg-[#FCECD6] text-[#ED6C3C]"
            }`}
          >
            {`${order.status === "تم التسليم" ? "نعم" : "لا"}`}
          </span>
        </td>
        <td className="p-4">
          <span
            className={`py-2 px-4 rounded-md ${
              order.status === "قيد الانتظار"
                ? "bg-[#FEFCDD] text-[#B2A23F]"
                : order.status === "تم التسليم"
                  ? "bg-[#E7F7ED] text-[#088B3A]"
                  : order.status === "تم التأكيد"
                    ? "bg-[#E1FDFD] text-[#3E77B0]"
                    : "bg-[#FCECD6] text-[#ED6C3C]"
            }`}
          >
            {order.status}
          </span>
        </td>
        <td className="flex items-center gap-2 p-4 space-x-2 rtl:space-x-reverse">
          <Link
            href={`/dashboard/orders/${order._id}`}
            className="bg-[#F4F4F4] p-2.75 rounded-[10px] cursor-pointer"
          >
            <InfoIcon />
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
        itemIdType={"orders"}
        itemId={order._id}
        title="هذا الطلب"
      />
    </>
  );
};

export default RequestRow;
