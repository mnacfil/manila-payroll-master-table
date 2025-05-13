"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployeesOptions } from "./query-options";
import { createEmployee, deleteEmployee } from "@/api/employees/mutations";
import { employeeKeys } from "@/api/employees/employeKeys";

export const useEmployees = () => {
  const queryClient = useQueryClient();
  const {
    isPending,
    isError,
    data: employees,
  } = useQuery(getEmployeesOptions());

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.mutateEmployee,
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload: any) => createEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.mutateEmployee,
      });
    },
  });

  return {
    isPending,
    isError,
    employees,
    deleteMutation,
    createMutation,
  };
};
