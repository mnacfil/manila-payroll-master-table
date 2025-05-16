"use client";

import { getQueryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PrimeReactProvider } from "primereact/api";

const AppProvider = ({ children }: Children) => {
  const queryClient = getQueryClient();
  return (
    <PrimeReactProvider>
      <QueryClientProvider client={queryClient}>
        {children} <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PrimeReactProvider>
  );
};

export default AppProvider;
