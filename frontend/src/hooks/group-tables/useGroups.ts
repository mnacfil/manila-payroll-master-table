"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupsOptions } from "./query-option";
import { CreateGroupPayload } from "@/api/group-tables/types";
import { createGroup } from "@/api/group-tables/mutations";
import { groupTablesKeys } from "@/api/group-tables/groupKeys";

export const useGroups = () => {
  const queryClient = useQueryClient();
  const {
    isPending,
    isError,
    data: groups = [],
  } = useQuery(getGroupsOptions());

  const createMutation = useMutation({
    mutationFn: (data: CreateGroupPayload) => createGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupTablesKeys.getGroups(),
      });
    },
  });

  return {
    isPending,
    isError,
    groups,
    createMutation,
  };
};
