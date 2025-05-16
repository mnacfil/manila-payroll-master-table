export const groupTablesKeys = {
  mutateGroup: ["mutate-group"],
  getOption: (id: string) => ["option", id],
  getGroups: () => ["groups"],
} as const;
