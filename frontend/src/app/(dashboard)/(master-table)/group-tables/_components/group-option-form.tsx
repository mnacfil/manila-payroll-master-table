"use client";

import {
  CreateGroupOptionRes,
  Group,
  Option,
  UpdateOptionRes,
} from "@/api/group-tables/types";
import { useGroups } from "@/hooks/group-tables/useGroups";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";

type Props = {
  mode?: "create" | "edit";
  defaultGroupOption?: Option | null;
  group: Omit<Group, "options">;
  onSuccessCb: (response: CreateGroupOptionRes | UpdateOptionRes) => void;
  onErrorCb: (error: Error) => void;
  onCancel: () => void;
};

const GroupOptionForm = ({
  defaultGroupOption,
  group,
  onErrorCb,
  onSuccessCb,
  onCancel,
  mode = "create",
}: Props) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      code: mode === "edit" ? defaultGroupOption?.code : "",
      name: mode === "edit" ? defaultGroupOption?.name : "",
      description: mode === "edit" ? defaultGroupOption?.desciption : "",
    },
  });
  const { createOptionMutation, updateOptionMutation } = useGroups({});
  const onSubmit = (values: any) => {
    if (mode === "create") {
      createOptionMutation.mutate(
        {
          groupId: group.id,
          data: {
            code_id: values.code,
            name: values.name,
            description: values?.description ?? "",
          },
        },
        {
          onSuccess: (response) => {
            reset();
            onSuccessCb(response);
          },
          onError: (error) => {
            onErrorCb(error);
          },
        }
      );
    } else {
      const { code, ...rest } = values;
      updateOptionMutation.mutate(
        {
          optionId: defaultGroupOption?.id ?? "",
          groupId: group.id,
          payload: { ...rest, ...(code && { code_id: code }) },
        },
        {
          onSuccess: (response) => {
            reset();
            onSuccessCb(response);
          },
          onError: (error) => {
            onErrorCb(error);
          },
        }
      );
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <div className="space-y-1 mb-4">
        <h2 className="font-bold text-lg">
          {mode === "create" ? "Create" : "Edit"} {group.title}
        </h2>
        <p className="text-gray-600 text-sm">
          {mode === "create" ? "Add" : "Update"} option to this group.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="first_name"
            className="block font-medium text-gray-700"
          >
            Code*
          </label>
          <InputText
            id="code"
            {...register("code", {
              required: "Group Name is required",
            })}
            className={`w-full ${errors.code ? "border-red-500" : ""}`}
          />
          {errors.code && (
            <p className="text-sm text-red-600">{errors.code.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="first_name"
            className="block font-medium text-gray-700"
          >
            Name*
          </label>
          <InputText
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            className={`w-full ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="first_name"
            className="block font-medium text-gray-700"
          >
            Description
          </label>
          <InputText
            id="description"
            {...register("description")}
            className={"w-full"}
          />
        </div>

        <div className="pt-2 flex justify-end gap-2">
          <Button label="Cancel" outlined type="button" onClick={onCancel} />
          <Button
            type="submit"
            label={`${mode === "create" ? "Create Option" : "Save Changes"}`}
            disabled={Object.values(errors).length > 0}
          />
        </div>
      </form>
    </div>
  );
};

export default GroupOptionForm;
