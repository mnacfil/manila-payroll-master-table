import { getQueryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import GroupTablesView from "./_components/group-tables-view";

const GroupTablesPage = () => {
  const queryClient = getQueryClient();

  // void queryClient.prefetchQuery({})

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GroupTablesView />
    </HydrationBoundary>
  );
};

export default GroupTablesPage;
