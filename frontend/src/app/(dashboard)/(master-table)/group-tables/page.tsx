import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import GroupTablesView from "./_components/group-tables-view";
import {
  getFirstGroupOptions,
  getGroupsOptions,
  getGroupsOptionsForSelect,
} from "@/hooks/group-tables/query-option";
import { DEPARTMENT_GRP_ID, ONE_MINUTE, POSITION_GRP_ID } from "@/lib/constant";

const GroupTablesPage = async () => {
  const queryClient = getQueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        ...getGroupsOptions(),
        staleTime: ONE_MINUTE,
      }),
      queryClient.prefetchQuery({
        ...getFirstGroupOptions(),
        staleTime: ONE_MINUTE,
      }),
    ]);
  } catch (error) {
    console.error("Prefetch failed:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupTablesView />
    </HydrationBoundary>
  );
};

export default GroupTablesPage;
