import { PayPalIcon } from "@/app/icons";

const OrderDetails = ({ orderItems, orderShipping }) => {
  const subtotal = orderItems.reduce((total, item) => {
    return total + item.productId.price * item.quantity;
  }, 0);

  const discount = orderItems.reduce((total, item) => {
    const itemDiscount = (item.productId.price * item.productId.discount) / 100;

    return total + itemDiscount * item.quantity;
  }, 0);

  const total = subtotal - (discount + orderShipping);
  return (
    <>
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-lg font-bold mb-6 text-right">المنتجات</h2>

        <div className="divide-y divide-gray-200">
          {orderItems.map((orderItem, index) => (
            <div className="grid grid-cols-3 gap-4 items-center justify-end py-4 text-sm">
              <div className="col-span-2 flex items-center gap-3">
                <img
                  src={orderItem.productId.images[0]}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <span className="text-right">
                  {orderItem.productId.productName}
                </span>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="text-center">
                  {orderItem.productId.price} دج
                </div>
                <div className="text-center">
                  {orderItem.productId.discount ? (
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#E7F7ED] text-[#088B3A]">
                      خصم {orderItem.productId.discount} %{" "}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#FDECEC] text-[#D32F2F]">
                      لا يتوفر خصم
                    </span>
                  )}
                </div>

                <div className="text-center"> {orderItem.quantity}</div>
                <div className="text-center">
                  {" "}
                  {(
                    orderItem.productId.price *
                    (1 - orderItem.productId.discount / 100) *
                    orderItem.quantity
                  ).toLocaleString("ar-DZ")}{" "}
                  دج
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-[#F9F9F9] rounded-2xl p-4">
          <div className="flex justify-between py-2">
            <span className="text-[#232323] text-sm font-bold">
              الإجمالي الفرعي
            </span>
            <span className="text-sm">{subtotal} دج</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#232323] text-sm font-bold">
              مجموع الخصم
            </span>
            <span className="text-sm">{discount} دج</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#232323] text-sm font-bold">الشحن</span>
            <span className="text-sm">{orderShipping} دج</span>
          </div>
          <div className="bg-[#D9D9D9] w-full h-px"></div>
          <div className="flex justify-between py-2 font-bold">
            <span>الإجمالي</span>
            <span> {total} دج</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">المعاملات </h2>
        </div>
        <div className="grid grid-cols-3 gap-8 text-sm">
          <div className="flex items-center gap-2">
            <PayPalIcon />
            <div>
              <p className="text-gray-500">الدفع عبر PayPal</p>
              {/* <p className="text-gray-500"> غير محدد</p> */}
              <p className="font-medium mt-2">{total} دج</p>
            </div>
          </div>
          <div>
            <p className="text-gray-500">المنتجات</p>
            <p className="font-medium mt-2"> {orderItems.length} منتجات</p>
          </div>

          <div>
            <p className="text-gray-500 mb-2">مدفوع</p>
            <span
              className={`px-3 py-1 rounded-md text-xs font-medium ${
                5 > 2
                  ? "bg-[#E7F7ED] text-[#088B3A]"
                  : "bg-[#FDECEC] text-[#D32F2F]"
              }`}
            >
              {5 > 4 ? "نعم" : "لا"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
