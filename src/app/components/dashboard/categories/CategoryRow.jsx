"use client";

import { useState } from "react";
import { DeleteIcon, EditIcon, InfoIcon } from "@/app/icons";
import Link from "next/link";
import { EditCategoryModal } from ".";
import { DeletePopup } from "../../ui";

const CategorieRow = ({ categorie, index }) => {
  const [isEditCategorie, setIsEditCategorie] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <>
      <tr>
        <td className="p-4">{index + 1}</td>
        <td className="p-4 font-medium">
          <span className="bg-[#F9F9F9] py-2 px-4 rounded-md">
            {categorie.categorieName}
          </span>
        </td>
        <td className="p-4">
          <span>{categorie.productsCount} منتج</span>
        </td>
        <td className="flex items-center gap-2 p-4 space-x-2 rtl:space-x-reverse">
          <Link
            href={`/dashboard/categories/${categorie._id}`}
            className="--info-but"
          >
            <InfoIcon />
          </Link>
          <button
            onClick={() => {
              setIsEditCategorie(true);
            }}
            className="--edit-but"
          >
            <EditIcon />
          </button>
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

      <EditCategoryModal
        isEditCategorie={isEditCategorie}
        setIsEditCategorie={setIsEditCategorie}
        categorie={categorie}
      />

      <DeletePopup
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        itemIdType={"categories"}
        itemId={categorie._id}
        title="الفئة"
      />
    </>
  );
};

export default CategorieRow;
