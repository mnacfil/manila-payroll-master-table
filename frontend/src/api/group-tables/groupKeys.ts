export const groupTablesKeys = {
  mutateGroup: ["mutate-group"],
  firstGroup: ["first-group"],
  defaultGroups: ["default-groups"],
  getOption: (id: string) => ["option", id],
  getGroups: () => ["groups"],
  getGroupOptions: (id: string) => ["groups", id, "options"],
} as const;
