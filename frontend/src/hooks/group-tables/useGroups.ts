"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGroupsOptions } from "./query-option";
import { CreateGroupPayload } from "@/api/group-tables/types";
import {
  createGroup,
  deleteGroup,
  updateGroup,
} from "@/api/group-tables/mutations";
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

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupTablesKeys.getGroups(),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      newUpdates,
    }: {
      id: string;
      newUpdates: CreateGroupPayload;
    }) => updateGroup(id, newUpdates),
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
    deleteMutation,
    updateMutation,
  };
};
