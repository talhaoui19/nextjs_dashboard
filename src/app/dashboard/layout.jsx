import {
  getAdmin,
  getCategories,
  getClients,
  getCoupons,
  getOrders,
  getProducts,
} from "@/lib/data";
import { Navbar, Sidebar } from "../components/ui";
import Providers from "./providers/Providers";

export const metadata = {
  title: "Nextjs Dashboard",
};

export default async function RootLayout({ children }) {
  const admin = await getAdmin();
  const products = await getProducts();
  const clients = await getClients();
  const categories = await getCategories();
  const orders = await getOrders();
  const coupons = await getCoupons();

  return (
    <Providers
      products={products}
      clients={clients}
      categories={categories}
      orders={orders}
      coupons={coupons}
    >
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar admin={admin} />
          {children}
        </div>
      </div>
    </Providers>
  );
}
