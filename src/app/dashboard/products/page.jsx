"use client";

import { useState } from "react";
import { ProductsTable } from "@/app/components/dashboard/products";
import { AddButton, HeaderSection, Search } from "@/app/components/ui";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <section className="flex-1 overflow-y-auto p-3 md:p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"المنتجات"} />

      <div className="bg-white p-3 md:p-4 rounded-xl mt-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-3">
          <Search
            placeholder={"بحث في المنتجات"}
            onSearch={(query) => {
              setSearchQuery(query);
            }}
          />
          <AddButton
            href={"/dashboard/products/add_product"}
            text={"اضافة منتج"}
          />
        </div>
        <div className="overflow-x-auto rounded-lg mt-6">
          <ProductsTable searchQuery={searchQuery} />
        </div>
      </div>
    </section>
  );
}
