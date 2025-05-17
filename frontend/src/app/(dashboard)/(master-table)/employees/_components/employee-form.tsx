"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { CreateEmployeePayload, Employee } from "@/api/employees/types";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { Dropdown } from "primereact/dropdown";
import { useGroups } from "@/hooks/group-tables/useGroups";

type Props = {
  mode?: "create" | "edit";
  defaultData?: Employee | null;
  initialGroupIDs: {
    department: string;
    position: string;
  };
  onSuccessCb?: () => void;
  onErrorCb?: (error: Error) => void;
};

const EmployeeForm = ({
  defaultData,
  initialGroupIDs,
  onErrorCb,
  onSuccessCb,
  mode = "create",
}: Props) => {
  const { createMutation, updateMutation } = useEmployees();
  const { deptOptions, posOptions } = useGroups({
    deptId: initialGroupIDs.department,
    posId: initialGroupIDs.position,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Employee>({
    defaultValues: {
      date_hired: defaultData?.date_hired || "",
      email: defaultData?.email || "",
      first_name: defaultData?.first_name || "",
      last_name: defaultData?.last_name || "",
      salary: defaultData?.salary || "",
      position: defaultData?.position || "",
      department: defaultData?.department || "",
    },
  });
  const departments = deptOptions.map((dept) => ({
    name: dept.name,
    code: dept.code_id,
  }));

  const positions = posOptions.map((pos) => ({
    name: pos.name,
    code: pos.code_id,
  }));

  const onSubmit = async (data: CreateEmployeePayload) => {
    if (mode === "create") {
      createMutation.mutate(data, {
        onSuccess: () => {
          reset();
          onSuccessCb?.();
        },
        onError: (error) => {
          onErrorCb?.(error);
        },
      });
    } else {
      updateMutation.mutate(
        { id: defaultData?.emp_id || "", payload: data },
        {
          onSuccess: () => {
            reset();
            onSuccessCb?.();
          },
        }
      );
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {mode === "create" ? "Create" : "Edit"} Employee
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name*
            </label>
            <InputText
              id="first_name"
              {...register("first_name", {
                required: "First name is required",
              })}
              className={`w-full ${errors.first_name ? "border-red-500" : ""}`}
            />
            {errors.first_name && (
              <p className="text-sm text-red-600">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name*
            </label>
            <InputText
              id="last_name"
              {...register("last_name", { required: "Last name is required" })}
              className={`w-full ${errors.last_name ? "border-red-500" : ""}`}
            />
            {errors.last_name && (
              <p className="text-sm text-red-600">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email*
          </label>
          <InputText
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`w-full ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="position"
            control={control}
            rules={{ required: "Position is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <label
                  htmlFor="date_hired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Position*
                </label>
                <Dropdown
                  value={field.value}
                  options={positions}
                  onChange={(e) => field.onChange(e.value)}
                  placeholder={"Select position"}
                  optionLabel="name"
                  optionValue="code"
                  className={`w-full ${
                    fieldState.error ? "border-red-500" : ""
                  }`}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="department"
            control={control}
            rules={{ required: "Department is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <label
                  htmlFor="date_hired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department*
                </label>
                <Dropdown
                  value={field.value}
                  options={departments}
                  onChange={(e) => field.onChange(e.value)}
                  placeholder={"Select position"}
                  optionLabel="name"
                  optionValue="code"
                  className={`w-full ${
                    fieldState.error ? "border-red-500" : ""
                  }`}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="date_hired"
            control={control}
            rules={{ required: "Date hired is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <label
                  htmlFor="date_hired"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date Hired*
                </label>
                <Calendar
                  id="date_hired"
                  value={field.value ? new Date(field.value) : null}
                  onChange={(e) => field.onChange(e.value)}
                  dateFormat="yy-mm-dd"
                  showIcon
                  className={`w-full ${
                    fieldState.error ? "border-red-500" : ""
                  }`}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="salary"
            control={control}
            rules={{ required: "Salary is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-1">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary*
                </label>
                <InputNumber
                  id="salary"
                  value={Number(field.value)}
                  onValueChange={(e) => field.onChange(e.value)}
                  mode="currency"
                  currency="PHP"
                  locale="en-US"
                  className={`w-full ${
                    fieldState.error ? "border-red-500" : ""
                  }`}
                />
                {fieldState.error && (
                  <p className="text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            label={`${mode === "create" ? "Create Employee" : "Save Changes"}`}
            icon={`pi pi-user-${mode === "create" ? "plus" : "edit"}`}
            loading={createMutation.isPending || updateMutation.isPending}
          />
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
