"use client";
import { AddButton, HeaderSection, Search } from "@/app/components/ui";
import { ClientsTable } from "../../components/dashboard/clients";
import { useClients } from "../context/ClientsContext";
import { useState } from "react";

export default function ClientsPage() {
  const { clients } = useClients();

  const [searchQuery, setSearchQuery] = useState("");
  return (
    <section className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"العملاء"} />
      <div className="bg-white p-4 rounded-xl mt-6">
        <div className="flex items-center justify-between mt-3">
          <Search
            placeholder={"بحث في العملاء"}
            onSearch={(query) => {
              setSearchQuery(query);
            }}
          />
          <AddButton
            href={"/dashboard/clients/add_client"}
            text={"عميل جديد"}
          />
        </div>
        <ClientsTable clients={clients} searchQuery={searchQuery} />
      </div>
    </section>
  );
}
