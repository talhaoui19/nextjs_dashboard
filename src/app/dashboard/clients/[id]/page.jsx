import { HeaderSection } from "@/app/components/ui";
import {
  ClientAddressCard,
  ClientInfoCard,
  ClientOrdersTable,
} from "../../../components/dashboard/client";
import { getClient, getOrdersByClient } from "@/lib/data/clients";

export default async function EditClientPage({ params }) {
  const { id } = await params;
  const client = await getClient(id);
  const orders = await getOrdersByClient(id);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <HeaderSection title={"العملاء"} subtitle={`${client.clientName}`} />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="w-90.5 space-y-6">
          <ClientInfoCard client={client} />
          <ClientAddressCard shipping={client.shipping} />
        </div>
        <div className="flex-1 space-y-6">
          <ClientOrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
}
