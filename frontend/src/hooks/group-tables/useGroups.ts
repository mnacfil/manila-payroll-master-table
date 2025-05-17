"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFirstGroupOptions, getGroupsOptions } from "./query-option";
import {
  CreateGroupOptionPayload,
  CreateGroupPayload,
  DeleteOptionParams,
  UpdateOptionParams,
} from "@/api/group-tables/types";
import {
  createGroup,
  createGroupOption,
  deleteGroup,
  deleteGroupOption,
  updateGroup,
  updateGroupOption,
} from "@/api/group-tables/mutations";
import { groupTablesKeys } from "@/api/group-tables/groupKeys";

export const useGroups = () => {
  const queryClient = useQueryClient();
  const {
    isPending,
    isError,
    data: groups = [],
  } = useQuery(getGroupsOptions());

  const { data: firstGroup } = useQuery(getFirstGroupOptions());

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

  const createOptionMutation = useMutation({
    mutationFn: ({
      groupId,
      data,
    }: {
      groupId: string;
      data: CreateGroupOptionPayload;
    }) => createGroupOption(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupTablesKeys.getGroups(),
      });
    },
  });

  const updateOptionMutation = useMutation({
    mutationFn: (params: UpdateOptionParams) => updateGroupOption(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: groupTablesKeys.getGroups(),
      });
    },
  });

  const deleteOptionMutation = useMutation({
    mutationFn: (params: DeleteOptionParams) => deleteGroupOption(params),
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
    firstGroup,
    createMutation,
    deleteMutation,
    updateMutation,
    createOptionMutation,
    updateOptionMutation,
    deleteOptionMutation,
  };
};
