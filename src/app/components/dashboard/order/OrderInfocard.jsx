const OrderInfocard = ({ order }) => {
  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">معلومات الطلب</h2>
      </div>
      <div className="grid grid-cols-5 gap-4 text-sm">
        <div>
          <p className="text-gray-500">التاريخ</p>
          <p className="font-medium mt-2">
            {new Date(order.createdAt).toLocaleDateString("ar-DZ")}
          </p>
        </div>

        <div>
          <p className="text-gray-500">المنتجات</p>
          <p className="font-medium mt-2">{order.items.length} منتجات</p>
        </div>

        <div>
          <p className="text-gray-500 mb-2">مدفوع</p>
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              order.status === "تم التسليم"
                ? "bg-[#E7F7ED] text-[#088B3A]"
                : "bg-[#FDECEC] text-[#D32F2F]"
            }`}
          >
            {order.status === "تم التسليم" ? "نعم" : "لا"}
          </span>
        </div>

        <div>
          <p className="text-gray-500 mb-2">الحالة</p>
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium
            ${
              order.status === "قيد الانتظار"
                ? "bg-[#FEFCDD] text-[#B2A23F]"
                : order.status === "تم التسليم"
                  ? "bg-[#E7F7ED] text-[#088B3A]"
                  : order.status === "تم التأكيد"
                    ? "bg-[#E1FDFD] text-[#3E77B0]"
                    : "bg-[#FCECD6] text-[#ED6C3C]"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div>
          <p className="text-gray-500">الإجمالي</p>
          <p className="font-medium mt-2">{order.totalPrice}.00 دج</p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfocard;
