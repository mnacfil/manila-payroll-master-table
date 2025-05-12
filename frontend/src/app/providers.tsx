"use client";

import { getQueryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from "primereact/api";

const AppProvider = ({ children }: Children) => {
  const queryClient = getQueryClient();
  return (
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PrimeReactProvider>
  );
};

export default AppProvider;
