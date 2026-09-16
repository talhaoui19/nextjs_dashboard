"use client";

import { ClientOrdersRow, OrdersSearchBar } from ".";
import { EmptyTableRow, Pagination } from "../../ui";
import { useState } from "react";

const ClientOrdersTable = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentOrders = orders.slice(
    (currentPage - 1) * 10,
    (currentPage - 1) * 10 + 10,
  );

  const totalPrice = orders.reduce((sum, order) => {
    return sum + order.totalPrice;
  }, 0);
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">الطلبات</h2>
        <p className="text-[#9A9A9A]">
          أنفق الإجمالي {totalPrice} دج على {orders.length} طلبات
        </p>
      </div>

      <OrdersSearchBar />

      <div className="overflow-x-auto rounded-lg mt-6">
        <table className="min-w-full table-fixed bg-white text-sm rtl:text-right text-left">
          <thead className="bg-[#F9F9F9] text-gray-700 font-semibold">
            <tr>
              {[
                "#",
                " رقم الطلب",
                "تاريخ الطلب",
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
                message="لا يوجد طلبات بعد ."
                description="لم يقم هذا العميل بأي طلب حتى الآن !"
              />
            ) : (
              currentOrders.map((order, index) => (
                <ClientOrdersRow
                  key={order._id}
                  order={order}
                  index={(currentPage - 1) * 10 + index}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {orders.length > 10 && (
        <Pagination
          totalPages={Math.ceil(orders.length / 10)}
          totalItems={orders.length}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ClientOrdersTable;
