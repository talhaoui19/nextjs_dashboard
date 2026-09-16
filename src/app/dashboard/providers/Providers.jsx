"use client";

import { CategoriesProvider } from "../context/CategoriesContext";
import { ClientsProvider } from "../context/ClientsContext";
import { CouponsProvider } from "../context/CouponsContext";
import { OrdersProvider } from "../context/OrdersContext";
import { ProductsProvider } from "../context/ProductsContext";

export default function Providers({
  children,
  categories,
  products,
  clients,
  orders,
  coupons,
}) {
  return (
    <CategoriesProvider categories={categories}>
      <ProductsProvider products={products}>
        <ClientsProvider clients={clients}>
          <OrdersProvider orders={orders}>
            <CouponsProvider coupons={coupons}>{children}</CouponsProvider>
          </OrdersProvider>
        </ClientsProvider>
      </ProductsProvider>
    </CategoriesProvider>
  );
}
