import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import GroupTablesView from "./_components/group-tables-view";
import { getGroupsOptions } from "@/hooks/group-tables/query-option";

const GroupTablesPage = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getGroupsOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupTablesView />
    </HydrationBoundary>
  );
};

export default GroupTablesPage;
