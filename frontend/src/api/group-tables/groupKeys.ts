export const groupTablesKeys = {
  mutateGroup: ["mutate-group"],
  firstGroup: ["first-group"],
  getOption: (id: string) => ["option", id],
  getGroups: () => ["groups"],
} as const;
