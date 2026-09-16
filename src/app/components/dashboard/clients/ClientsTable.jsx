"use client";

import { useSearchPagination } from "@/hooks";
import { ClientRow } from ".";
import { EmptyTableRow, Pagination } from "../../ui";

const ClientsTable = ({ clients, searchQuery }) => {
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
      const clientEmail = client.email.toLowerCase();
      const clientWilaya = client.wilaya.toLowerCase();

      return (
        clientName.includes(query) ||
        clientEmail.includes(query) ||
        clientWilaya.includes(query)
      );
    },
  });
  return (
    <section className="overflow-x-auto rounded-lg mt-6">
      <table className="min-w-full table-auto bg-white text-sm rtl:text-right text-left">
        <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
          <tr>
            {["#", "الاسم", "مسجل", "الولاية", "الإنفاق", "الإجراء"].map(
              (col, index) => (
                <th className="px-4 py-2 text-sm text-[#6C6C6C] text-start">
                  {col}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {currentClients.length === 0 ? (
            <EmptyTableRow
              colSpan={6}
              message={
                searchQuery.length > 0 ? "لا توجد نتائج" : "لا يوجد عملاء بعد."
              }
              description={
                searchQuery.length > 0
                  ? "لم نجد أي عميل يطابق بحثك."
                  : "لم تقم بإضافة أي عملاء حتى الآن."
              }
            />
          ) : (
            currentClients.map((client, index) => (
              <ClientRow key={client._id} client={client} index={index} />
            ))
          )}
        </tbody>
      </table>
      {filteredItems.length > 10 && (
        <Pagination
          totalPages={Math.ceil(clients.length / 10)}
          totalItems={clients.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default ClientsTable;
