import { getEmployeesOptions } from "@/hooks/employees/query-options";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EmployeesView from "./_components/employees-view";

const EmployeesPage = async () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getEmployeesOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeesView />
    </HydrationBoundary>
  );
};

export default EmployeesPage;
