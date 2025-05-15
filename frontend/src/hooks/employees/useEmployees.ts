"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEmployeesOptions } from "./query-options";
import {
  createEmployee,
  deleteEmployee,
  deleteMultipleEmployee,
  updateEmployee,
} from "@/api/employees/mutations";
import { employeeKeys } from "@/api/employees/employeKeys";
import {
  CreateEmployeePayload,
  UpdateEmployeeParams,
} from "@/api/employees/types";

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
    mutationFn: (payload: CreateEmployeePayload) => createEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.mutateEmployee,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: UpdateEmployeeParams) =>
      updateEmployee({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.mutateEmployee,
      });
    },
  });

  const deleteMultipleMutation = useMutation({
    mutationFn: (ids: string[]) => deleteMultipleEmployee(ids),
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
    updateMutation,
    deleteMultipleMutation,
  };
};
