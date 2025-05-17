"use client";

import { employeeInitFilters } from "@/lib/constant";
import { useState } from "react";

export const useEmployeesFilter = () => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState(employeeInitFilters);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalFilterValue(value);

    setFilters((prevFilters) => ({
      ...prevFilters,
      global: { ...prevFilters.global, value },
    }));
  };

  const clearFilter = () => {
    setGlobalFilterValue("");
    setFilters(employeeInitFilters);
  };

  return {
    filters,
    globalFilterValue,
    clearFilter,
    setFilters,
    onGlobalFilterChange,
  };
};
