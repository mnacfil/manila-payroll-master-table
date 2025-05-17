import { groupTablesKeys } from "@/api/group-tables/groupKeys";
import {
  getFirstGroup,
  getGroupOptions as _getGroupOptions,
  getGroups,
  getGroupOptions,
  getDefaultGroups,
} from "@/api/group-tables/queries";
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

export const getGroupsOptionsForSelect = (id: string) =>
  queryOptions({
    queryKey: groupTablesKeys.getGroupOptions(id),
    queryFn: () => getGroupOptions(id),
  });

export const getDefaultGroupsOptions = () =>
  queryOptions({
    queryKey: groupTablesKeys.defaultGroups,
    queryFn: () => getDefaultGroups(),
  });
