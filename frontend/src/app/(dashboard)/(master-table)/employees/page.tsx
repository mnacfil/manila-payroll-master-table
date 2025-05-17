import { getEmployeesOptions } from "@/hooks/employees/query-options";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EmployeesView from "./_components/employees-view";
import { ONE_MINUTE } from "@/lib/constant";
import { getDefaultGroupsOptions } from "@/hooks/group-tables/query-option";

const EmployeesPage = async () => {
  const queryClient = getQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        ...getEmployeesOptions(),
        staleTime: ONE_MINUTE,
      }),
      queryClient.prefetchQuery({
        ...getDefaultGroupsOptions(),
        staleTime: ONE_MINUTE,
      }),
    ]);
  } catch (error) {
    console.error("Prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeesView />
    </HydrationBoundary>
  );
};

export default EmployeesPage;
