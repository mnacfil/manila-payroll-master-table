export const employeeKeys = {
  getEmployees: (params: Record<string, string>) => ["employees", params],
  getEmployee: (id: string) => ["employee", id],
} as const;
