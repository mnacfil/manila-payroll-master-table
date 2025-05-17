export type Employee = {
  emp_id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_hired: string;
  salary: string;
  active: number;
  position: string;
  department: string;
  created_at: string;
  updated_at: string;
};

export type CreateEmployeePayload = Omit<
  Employee,
  "created_at" | "updated_at" | "emp_id"
>;

export type CreateEmployeeRes = Omit<Employee, "created_at" | "updated_at">;

export type UpdateEmployeePayload = Partial<CreateEmployeePayload>;
export type UpdateEmployeeParams = {
  id: string;
  payload: UpdateEmployeePayload;
};
