import { groupTablesKeys } from "@/api/group-tables/groupKeys";
import { getFirstGroup, getGroups } from "@/api/group-tables/queries";
import { queryOptions } from "@tanstack/react-query";

export const getGroupsOptions = () =>
  queryOptions({
    queryKey: groupTablesKeys.getGroups(),
    queryFn: getGroups,
  });

export const getFirstGroupOptions = () =>
  queryOptions({
    queryKey: groupTablesKeys.firstGroup,
    queryFn: getFirstGroup,
  });
