"use client";

import { createContext, useContext } from "react";

const OrdersContext = createContext(null);

export function OrdersProvider({ orders, children }) {
  return (
    <OrdersContext.Provider value={{ orders }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useClients must be used inside OrdersProvider");
  }

  return context;
}
