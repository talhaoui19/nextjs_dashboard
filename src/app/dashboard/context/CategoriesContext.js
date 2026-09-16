"use client";

import { createContext, useContext } from "react";

const CategoriesContext = createContext(null);

export function CategoriesProvider({ categories, children }) {
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("useCategories must be used inside CategoriesProvider");
  }

  return context;
}
