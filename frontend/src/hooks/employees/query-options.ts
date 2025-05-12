import { employeeKeys } from "@/api/employees/employeKeys";
import { getEmployees } from "@/api/employees/queries";
import { queryOptions } from "@tanstack/react-query";

export const getEmployeesOptions = () =>
  queryOptions({
    queryKey: employeeKeys.getEmployees({}),
    queryFn: () => getEmployees(),
  });
