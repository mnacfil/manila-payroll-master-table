export type Option = {
  id: string;
  name: string;
  code: string;
  desciption: string;
};

export type Group = {
  id: string;
  title: string;
  options: Option[];
};

export type GroupsRes = Group[];
