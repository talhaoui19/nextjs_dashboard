"use client";
import { useState } from "react";
import { CouponsTable } from "../../components/dashboard/coupons";
import { AddButton, HeaderSection, Search } from "@/app/components/ui";

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"الكوبونات"} />
      <div className="bg-white p-4 rounded-xl mt-6">
        <div className="flex items-center justify-between mt-3">
          <Search
            placeholder={"بحث في الكوبونات"}
            onSearch={(query) => {
              setSearchQuery(query);
            }}
          />
          <AddButton
            href={"/dashboard/coupons/add_coupon"}
            text={"كوبون جديد"}
          />
        </div>
        <div className="overflow-x-auto rounded-lg mt-6">
          <CouponsTable searchQuery={searchQuery} />
        </div>
      </div>
    </section>
  );
}
