export type Employee = {
  emp_id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_hired: string;
  salary: string;
  active: number;
  created_at: string;
  updated_at: string;
};

export type CreateEmployeePayload = Pick<
  Employee,
  "first_name" | "last_name" | "date_hired" | "email" | "salary" | "active"
>;

export type CreateEmployeeRes = Omit<Employee, "created_at" | "updated_at">;
