"use client";

import { useQuery } from "@tanstack/react-query";
import { getGroupsOptions } from "./query-option";

export const useGroups = () => {
  const {
    isPending,
    isError,
    data: groups = [],
  } = useQuery(getGroupsOptions());

  return {
    isPending,
    isError,
    groups,
  };
};
