import { getEmployeesOptions } from "@/hooks/employees/query-options";
import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EmployeesView from "./_components/employees-view";
import { ONE_MINUTE } from "@/lib/constant";
import { getGroupsOptionsForSelect } from "@/hooks/group-tables/query-option";
import { getGroups } from "@/api/group-tables/queries";

const EmployeesPage = async () => {
  const queryClient = getQueryClient();
  const groups = await getGroups();

  const deptGroupId = groups[0]?.id || "";
  const posGroupId = groups[1]?.id || "";

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        ...getEmployeesOptions(),
        staleTime: ONE_MINUTE,
      }),
      queryClient.prefetchQuery({
        ...getGroupsOptionsForSelect(deptGroupId),
        staleTime: ONE_MINUTE,
      }),
      queryClient.prefetchQuery({
        ...getGroupsOptionsForSelect(posGroupId),
        staleTime: ONE_MINUTE,
      }),
    ]);
  } catch (error) {
    console.error("Prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeesView
        initialGroupIDs={{ department: deptGroupId, position: posGroupId }}
      />
    </HydrationBoundary>
  );
};

export default EmployeesPage;
