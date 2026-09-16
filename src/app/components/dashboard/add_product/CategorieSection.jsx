"use client";
import Link from "next/link";
import { CloseIcon } from "../../icons/close";
import { useState } from "react";
import { useCategories } from "@/app/dashboard/context/CategoriesContext";

const CategorieSection = ({ onProductDataChange }) => {
  const { categories } = useCategories();
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  const handleCategorieChange = (eo) => {
    const categorieId = eo.target.value;
    const categorie = categories.find((cat) => cat._id === categorieId);
    setSelectedCategorie(categorie);
    onProductDataChange("categorie", categorieId);
  };

  const handleRemoveCategorie = () => {
    setSelectedCategorie(null);
    onProductDataChange("categorie", "");
  };

  return (
    <section className="bg-white p-6 rounded-lg">
      <h2 className="text-base font-semibold mb-4">الفئة</h2>

      <div className="space-y-3">
        {selectedCategorie && (
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 bg-[#F9F9F9] text-[#9A9A9A] px-4 py-1 rounded-[6px] text-sm">
              {selectedCategorie.categorieName}
              <button type="button" onClick={handleRemoveCategorie}>
                <CloseIcon />
              </button>
            </span>
          </div>
        )}

        <select
          className="--input"
          value={selectedCategorie?._id || ""}
          required
          onChange={handleCategorieChange}
        >
          <option value="" disabled>
            اختر فئة
          </option>

          {categories.map((categorie) => (
            <option key={categorie._id} value={categorie._id}>
              {categorie.categorieName}
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

export default CategorieSection;
