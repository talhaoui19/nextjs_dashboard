"use client";

import { useState } from "react";
import { Search } from "../../ui";
import { ClientMessagesRow } from ".";
import { useSearchPagination } from "@/hooks";

export default function ClientsList({
  clients,
  selectedClient,
  setSelectedClient,
  latestMessages,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    currentItems: currentClients,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredItems,
  } = useSearchPagination({
    items: clients,
    searchQuery,
    itemsPerPage: 10,

    searchFn: (client, query) => {
      const clientName = client.clientName.toLowerCase();

      return clientName.includes(query);
    },
  });
  return (
    <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col min-h-0">
      <div className="shrink-0 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">الدردشات</h1>
        </div>

        <Search
          placeholder="ابحث في الدردشات"
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />
      </div>

      <div className="flex-1 min-h-0 px-4 overflow-y-auto">
        {currentClients.length === 0 ? (
          <span className="flex justify-center text-center text-base py-8 text-gray-500">
            لا توجد نتائج <br />
            لم نجد أي عميل يطابق بحثك.
          </span>
        ) : (
          currentClients.map((client) => {
            const latestMessage = latestMessages?.find(
              (message) => message._id === client._id,
            );
            return (
              <ClientMessagesRow
                key={client._id}
                client={client}
                latestMessage={latestMessage}
                selectedClient={selectedClient}
                setSelectedClient={setSelectedClient}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
