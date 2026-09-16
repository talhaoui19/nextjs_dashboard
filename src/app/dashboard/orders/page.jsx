"use client";
import { OrderTable } from "@/app/components/dashboard/orders";
import { HeaderSection, Search } from "@/app/components/ui";
import { useState } from "react";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <section className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"الطلبات"} />
      <div className="bg-white p-4 rounded-xl mt-6">
        <Search
          placeholder={"بحث في الطلبات"}
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />
        <OrderTable searchQuery={searchQuery} />
      </div>
    </section>
  );
}
