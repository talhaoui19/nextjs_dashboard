"use client";

import { useOrders } from "@/app/dashboard/context/OrdersContext";
import { OrderRow } from ".";
import { EmptyTableRow, Pagination } from "../../ui";
import { useSearchPagination } from "@/hooks";

export default function OrderTable({ searchQuery = "" }) {
  const { orders } = useOrders();

  const {
    currentItems: currentOrders,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredItems,
  } = useSearchPagination({
    items: orders,
    searchQuery,
    itemsPerPage: 10,

    searchFn: (order, query) => {
      const orderId = `#${order._id.toLowerCase()}`;
      const orderDate = new Date(order.createdAt).toLocaleDateString("ar-DZ", {
        year: "numeric",
        month: "long",
        day: "numeric",
        numberingSystem: "latn",
      });
      const clientName = order.clientId.clientName.toLowerCase();
      const orderStatus = order.status.toLowerCase();

      return (
        orderId.includes(query) ||
        orderDate.includes(query) ||
        clientName.includes(query) ||
        orderStatus.includes(query)
      );
    },
  });
  return (
    <section className="overflow-x-auto rounded-lg mt-6">
      <table className="min-w-full table-fixed bg-white text-sm rtl:text-right text-left">
        <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
          <tr>
            {[
              "#",
              " رقم الطلب",
              "تاريخ الطلب",
              "العميل",
              "العناصر",
              "مدفوع",
              "الحالة",
              "الإجراء",
            ].map((col) => (
              <th className="px-4 py-2 text-sm text-[#6C6C6C] text-start">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-800">
          {currentOrders.length === 0 ? (
            <EmptyTableRow
              colSpan={7}
              message={
                searchQuery.length > 0 ? "لا توجد نتائج" : "لا يوجد طلبات بعد."
              }
              description={
                searchQuery.length > 0
                  ? "لم نجد أي طلب يطابق بحثك."
                  : "لم يقم أي عميل بأي طلب حتى الآن."
              }
            />
          ) : (
            currentOrders.map((order, index) => (
              <OrderRow
                key={order._id}
                order={order}
                index={(currentPage - 1) * 10 + index}
              />
            ))
          )}
        </tbody>
      </table>
      {filteredItems.length > 10 && (
        <Pagination
          totalPages={totalPages}
          totalItems={filteredItems.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
}
