export const employeeKeys = {
  mutateEmployee: ["mutate-employee"],
  getEmployees: (params: Record<string, string>) => [
    ...employeeKeys.mutateEmployee,
    "employees",
    params,
  ],
  getEmployee: (id: string) => ["employee", id],
} as const;
