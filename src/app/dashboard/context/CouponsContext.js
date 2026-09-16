"use client";

import { createContext, useContext } from "react";

const CouponsContext = createContext(null);

export function CouponsProvider({ coupons, children }) {
  return (
    <CouponsContext.Provider value={{ coupons }}>
      {children}
    </CouponsContext.Provider>
  );
}

export function useCoupons() {
  const context = useContext(CouponsContext);

  if (!context) {
    throw new Error("useCoupons must be used inside CouponsProvider");
  }

  return context;
}
