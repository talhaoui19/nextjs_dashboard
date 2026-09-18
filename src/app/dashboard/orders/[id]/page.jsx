import { ClientInfo, OrderDetails, OrderInfocard } from "@/app/components/dashboard/order";
import { HeaderSection } from "@/app/components/ui";
import { getOrder } from "@/lib/data/orders";


export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await getOrder(id);
  return (
    <section className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"الطلبات"} subtitle={"الطلب رقم 13"} />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1 space-y-6">
          <OrderInfocard order={order} />
          <OrderDetails orderItems={order.items} totalPrice={order.totalPrice} orderShipping={order.shipping} />
        </div>
        <ClientInfo client={order.clientId} />
      </div>
    </section>
  );
}
