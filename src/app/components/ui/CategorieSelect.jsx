"use client";

import Link from "next/link";
import { CloseIcon } from "@/app/components/icons/close";
import { useState } from "react";
import { useCategories } from "@/app/dashboard/context/CategoriesContext";

const CategorieSelect = ({
  onDataChange,
  selectedCategoryId = "",
  label = "الفئة",
  required = false,
}) => {
  const { categories } = useCategories();
  const [currentCategoryId, setCurrentCategoryId] = useState(selectedCategoryId);

  const selectedCategory = categories.find(
    (cat) => cat._id === currentCategoryId,
  );

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setCurrentCategoryId(categoryId); // ✅ تحديث الـ state
    onDataChange("categorie", categoryId);
  };

  const handleRemoveCategory = () => {
    setCurrentCategoryId(""); // ✅ حذف الـ state
    onDataChange("categorie", "");
  };

  return (
    <section className="bg-white p-6 rounded-lg">
      <h2 className="text-base font-semibold mb-4">{label}</h2>

      <div className="space-y-3">
        {selectedCategory && (
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 bg-[#F9F9F9] text-[#9A9A9A] px-4 py-1 rounded-[6px] text-sm">
              {selectedCategory.categorieName}
              <button type="button" onClick={handleRemoveCategory}>
                <CloseIcon />
              </button>
            </span>
          </div>
        )}

        <select
          className="--input"
          value={currentCategoryId}
          required={required}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>
            اختر فئة
          </option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categorieName}
            </option>
          ))}
        </select>
      </div>

      <Link
        href={"/dashboard/categories"}
        className="block text-sm text-[var(--main-color)] mt-6"
      >
        اضافة فئة جديدة
      </Link>
    </section>
  );
};

export default CategorieSelect;