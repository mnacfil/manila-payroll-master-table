"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Employee } from "@/api/employees/types";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { useRouter } from "next/navigation";

export default function CreateEmployeeForm() {
  const toast = useRef<Toast>(null);
  const { createMutation } = useEmployees();
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Employee>({
    defaultValues: {
      date_hired: "",
      email: "",
      first_name: "",
      last_name: "",
      salary: "",
    },
  });

  const onSubmit = async (data: Employee) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Employee created successfully",
          life: 3000,
        });
        reset();
        push("/employees");
      },
      onError: (error) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: error?.message || "Failed to create employee",
          life: 4000,
        });
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Toast ref={toast} position="top-right" />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Employee
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
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
          <div className="space-y-1">
            <label
              htmlFor="date_hired"
              className="block text-sm font-medium text-gray-700"
            >
              Date Hired*
            </label>
            <Calendar
              id="date_hired"
              {...register("date_hired", {
                required: "Date hired is required",
              })}
              dateFormat="yy-mm-dd"
              showIcon
              className={`w-full ${errors.date_hired ? "border-red-500" : ""}`}
            />
            {errors.date_hired && (
              <p className="text-sm text-red-600">
                {errors.date_hired.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary*
            </label>
            <Controller
              name="salary"
              control={control}
              rules={{ required: "Salary is required" }}
              render={({ field, fieldState }) => (
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
              )}
            />
            {errors.salary && (
              <p className="text-sm text-red-600">{errors.salary.message}</p>
            )}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            label="Create Employee"
            icon="pi pi-user-plus"
            loading={createMutation.isPending}
          />
        </div>
      </form>
    </div>
  );
}
