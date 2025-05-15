"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";

type Props = {
  mode?: "create" | "edit";
  tabTitle: string;
};

const GroupTableForm = ({ tabTitle, mode = "create" }: Props) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: any) => {};

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{tabTitle}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700"
          >
            First Name*
          </label>
          <InputText
            id="first_name"
            {...register("name", {
              required: "First name is required",
            })}
            className={`w-full ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div className="pt-2 flex justify-end">
          <Button
            type="submit"
            label={`${mode === "create" ? "Create Employee" : "Save Changes"}`}
            icon={`pi pi-user-${mode === "create" ? "plus" : "edit"}`}
          />
        </div>
      </form>
    </div>
  );
};

export default GroupTableForm;
