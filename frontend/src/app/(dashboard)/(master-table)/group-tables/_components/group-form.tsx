"use client";

import { CreateGroupRes, Group } from "@/api/group-tables/types";
import { useGroups } from "@/hooks/group-tables/useGroups";
import { DEFAULT_GROUP_ICON, icons } from "@/lib/constant";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";

type Props = {
  mode?: "create" | "edit";
  defaultGroup?: Group | null;
  onSuccessCb: (response: CreateGroupRes) => void;
  onErrorCb: (error: Error) => void;
  onCancel: () => void;
};

const GroupForm = ({
  defaultGroup,
  onErrorCb,
  onSuccessCb,
  onCancel,
  mode = "create",
}: Props) => {
  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: mode === "edit" ? defaultGroup?.title : "",
      icon: DEFAULT_GROUP_ICON,
    },
  });
  const { createMutation, updateMutation } = useGroups({});

  const onSubmit = (values: any) => {
    if (mode === "create") {
      createMutation.mutate(
        { title: values.name },
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
      updateMutation.mutate(
        { id: defaultGroup?.id || "", newUpdates: { title: values.name } },
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

  const iconOptionTemplate = (option: { name: string; code: string }) => {
    return (
      <div className="flex items-center">
        <i className={`pi pi-${option.code} mr-2`}></i>
        <div>{option.name}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <div className="space-y-1 mb-4">
        <h2 className="font-bold text-lg">Create New Group</h2>
        <p className="text-gray-600 text-sm">
          Add a new group that will appear as a tab in the main interface.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="first_name"
            className="block font-medium text-gray-700"
          >
            Group Name*
          </label>
          <InputText
            id="first_name"
            {...register("name", {
              required: "Group Name is required",
            })}
            className={`w-full ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <div className="space-y-1">
              <label
                htmlFor="first_name"
                className="block font-medium text-gray-700"
              >
                Icons
              </label>
              <Dropdown
                placeholder="Select icon"
                options={icons}
                optionLabel="name"
                className="w-full"
                checkmark={true}
                highlightOnSelect={false}
                value={field.value}
                onChange={(e) => field.onChange(e.value)}
                itemTemplate={iconOptionTemplate}
              />
            </div>
          )}
        />
        <div className="pt-2 flex justify-end gap-2">
          <Button label="Cancel" outlined type="button" onClick={onCancel} />
          <Button
            type="submit"
            label={`${mode === "create" ? "Create Group" : "Save Changes"}`}
            disabled={Object.values(errors).length > 0}
          />
        </div>
      </form>
    </div>
  );
};

export default GroupForm;
