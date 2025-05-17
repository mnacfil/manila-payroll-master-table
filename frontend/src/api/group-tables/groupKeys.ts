export const groupTablesKeys = {
  mutateGroup: ["mutate-group"],
  firstGroup: ["first-group"],
  getOption: (id: string) => ["option", id],
  getGroups: () => ["groups"],
  getGroupOptions: (id: string) => ["groups", id, "options"],
} as const;
