import { MoreIcon } from "@/app/icons";
import { EmptyTableRow } from "../ui";
import { OrderRow } from "./orders";

export default function DashboardOrdersTable({ orders }) {
  return (
    <section className="bg-white p-4 rounded-xl mt-6">
      <div className="flex items-center justify-between p-2">
        <span className="text-sm font-semibold">الطلبات الأخيرة</span>
        <MoreIcon />
      </div>
      <div className="overflow-x-auto rounded-lg mt-6">
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
            {orders.length === 0 ? (
              <EmptyTableRow
                colSpan={8}
                message="لا يوجد طلبات بعد."
                description="لم يقم أي عميل بطلب لحد الآن !"
              />
            ) : (
              orders.map((order, index) => (
                <OrderRow key={order._id} order={order} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
