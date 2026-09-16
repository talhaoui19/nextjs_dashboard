import { getLatestOrders } from "@/lib/data";
import DashboardOrdersTable from "../components/dashboard/DashboardOrdersTable";
import TopStats from "../components/ui/TopStats";
import DashboardStatus from "../components/ui/DashboardStatus";

export default async function HomePage() {
  const orders = await getLatestOrders();
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-[#F9F9F9] animate-fade transition-all duration-300">
      <div className="p-6 space-y-6">
        <span className="text-[18px] md:text-[21px] font-semibold block mb-6">
          لوحة المعلومات
        </span>
        <TopStats />
        <DashboardStatus />
        <DashboardOrdersTable orders={orders} />
      </div>
    </main>
  );
}
