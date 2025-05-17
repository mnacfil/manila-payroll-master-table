import { getEmployeesOptions } from "@/hooks/employees/query-options";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EmployeesView from "./_components/employees-view";
import { DEPARTMENT_GRP_ID, ONE_MINUTE, POSITION_GRP_ID } from "@/lib/constant";
import { getGroupsOptionsForSelect } from "@/hooks/group-tables/query-option";

const EmployeesPage = async () => {
  const queryClient = getQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        ...getEmployeesOptions(),
        staleTime: ONE_MINUTE,
      }),
      queryClient.prefetchQuery({
        ...getGroupsOptionsForSelect(DEPARTMENT_GRP_ID),
        staleTime: ONE_MINUTE,
      }),
      queryClient.prefetchQuery({
        ...getGroupsOptionsForSelect(POSITION_GRP_ID),
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
