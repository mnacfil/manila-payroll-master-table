export type Option = {
  id: string;
  name: string;
  code: string;
  desciption: string;
};

export type Group = {
  id: string;
  title: string;
  options?: Option[];
};

export type GroupsRes = Group[];

export type CreateGroupPayload = {
  title: string;
};

export type CreateGroupRes = {
  id: string;
  title: string;
};

export type DeleteGroupRes = {
  success: boolean;
};
