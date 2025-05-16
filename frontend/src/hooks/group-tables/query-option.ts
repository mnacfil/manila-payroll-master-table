import { groupTablesKeys } from "@/api/group-tables/groupKeys";
import { getGroups } from "@/api/group-tables/queries";
import { queryOptions } from "@tanstack/react-query";

export const getGroupsOptions = () =>
  queryOptions({
    queryKey: groupTablesKeys.getGroups(),
    queryFn: getGroups,
  });
