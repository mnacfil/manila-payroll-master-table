"use client";

import { useQuery } from "@tanstack/react-query";
import { getEmployeesOptions } from "./query-options";

export const useEmployees = () => {
  const {
    isPending,
    isError,
    data: employees,
  } = useQuery(getEmployeesOptions());

  return {
    isPending,
    isError,
    employees,
  };
};
