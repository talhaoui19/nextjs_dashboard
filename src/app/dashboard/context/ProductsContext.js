"use client";

import { createContext, useContext } from "react";

const ProductsContext = createContext(null);

export function ProductsProvider({ products, children }) {
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
}
