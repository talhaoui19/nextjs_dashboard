"use client";
import { AddButton, HeaderSection, Search } from "@/app/components/ui";
import {
  AddCategoryModal,
  CategoriesTable,
} from "../../components/dashboard/categories";
import { useState } from "react";
import { useCategories } from "../context/CategoriesContext";

export default function CategoriesPage() {
  const { categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCategorie, setIsAddCategorie] = useState(false);

  return (
    <section className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"الفئات"} />

      <div className="bg-white p-4 rounded-xl mt-6">
        <div className="flex items-center justify-between mt-3">
          <Search
            placeholder={"بحث في الفئات"}
            onSearch={(query) => {
              setSearchQuery(query);
            }}
          />
          <AddButton
            href={""}
            text={"فئة جديدة"}
            onClick={() => {
              setIsAddCategorie(true);
            }}
          />
        </div>
        <CategoriesTable categories={categories} searchQuery={searchQuery} />
      </div>

      <AddCategoryModal
        isAddCategorie={isAddCategorie}
        setIsAddCategorie={setIsAddCategorie}
      />
    </section>
  );
}
