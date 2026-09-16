"use client";

import { createContext, useContext } from "react";

const ClientsContext = createContext(null);

export function ClientsProvider({ clients, children }) {
  return (
    <ClientsContext.Provider value={{ clients }}>
      {children}
    </ClientsContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientsContext);

  if (!context) {
    throw new Error("useClients must be used inside ClientsProvider");
  }

  return context;
}
