"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getFirstGroupOptions,
  getGroupsOptions,
  getGroupsOptionsForSelect,
} from "./query-option";
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
import { DEPARTMENT_GRP_ID, POSITION_GRP_ID } from "@/lib/constant";

export const useGroups = () => {
  const queryClient = useQueryClient();
  const {
    isPending,
    isError,
    data: groups = [],
  } = useQuery(getGroupsOptions());

  const { data: firstGroup } = useQuery(getFirstGroupOptions());
  const { data: deptOptions = [] } = useQuery(
    getGroupsOptionsForSelect(DEPARTMENT_GRP_ID)
  );
  const { data: posOptions = [] } = useQuery(
    getGroupsOptionsForSelect(POSITION_GRP_ID)
  );

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
    deptOptions,
    posOptions,
    createMutation,
    deleteMutation,
    updateMutation,
    createOptionMutation,
    updateOptionMutation,
    deleteOptionMutation,
  };
};
