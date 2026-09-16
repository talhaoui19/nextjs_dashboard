"use client";

import { useState } from "react";
import { DeleteIcon, EditIcon } from "@/app/icons";
import Link from "next/link";
import { DeletePopup } from "../../ui";

export default function ProductRow({ product, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <tr>
        <td className="p-4">{index + 1}</td>
        <td className="flex items-center gap-4 py-4">
          <img
            src={`${product.images[0]}`}
            className="w-14.5 h-14.5 object-cover rounded-xl"
          />

          <span className="text-[#232323]">{product.productName}</span>
        </td>
        <td className="p-4 font-medium space-x-3">
          <span className="bg-[#F9F9F9] py-2 px-4 rounded-md">
            {product.categorie.categorieName}
          </span>
        </td>
        <td className="p-4">
          {5 > 0 ? (
            <span>{product.quantity} قطعة</span>
          ) : (
            <span className="text-red-500 font-medium">نفذ المخزون</span>
          )}
        </td>
        <td className="p-4">{product.price} دج</td>
        <td className="flex items-center gap-2 p-4 space-x-2 rtl:space-x-reverse">
          <Link
            href={`/dashboard/products/${product._id}/edit_product`}
            className="--edit-but"
          >
            <EditIcon />
          </Link>
          <button
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
        itemIdType={"products"}
        itemId={product._id}
        title="المنتج"
      />
    </>
  );
}
