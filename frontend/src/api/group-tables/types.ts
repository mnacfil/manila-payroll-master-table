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

export type UpdateGroupRes = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type CreateGroupOptionPayload = {
  code_id: string;
  name: string;
  description?: string;
};

export type CreateGroupOptionRes = {
  id: string;
  code_id: string;
  name: string;
  description: string;
};

export type UpdateOptionParams = {
  optionId: string;
  groupId: string;
  payload: Partial<CreateGroupOptionPayload>;
};

export type UpdateOptionRes = {
  id: string;
  code_id: string;
  name: string;
  description: string | null;
  group_id: string;
  created_at: string;
  updated_at: string;
};

export type DeleteOptionParams = Omit<UpdateOptionParams, "payload">;

export type GetGroupOptionsRes = UpdateOptionRes[];
