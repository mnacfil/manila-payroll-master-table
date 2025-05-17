"use client";

import { Button } from "primereact/button";
import GroupTable from "./groub-table";
import Dialog from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import GroupForm from "./group-form";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import ManageGroups from "./manage-groups";
import { useGroups } from "@/hooks/group-tables/useGroups";
import GroupOptionForm from "./group-option-form";
import { Group, Option } from "@/api/group-tables/types";

const GroupTablesView = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openManageGroupDialog, setOpenManageGroupDialog] = useState(false);
  const [openGroupFormDialog, setOpenGroupFormDialog] = useState(false);
  const [groupFormState, setGroupFormState] = useState<{
    mode: "create" | "edit";
    default: Option | null;
  }>({
    mode: "create",
    default: null,
  });
  const toast = useRef<Toast | null>(null);
  const { isPending, isError, groups, firstGroup } = useGroups();

  const [group, setGroup] = useState<Omit<Group, "options">>({
    id: firstGroup?.id || "",
    title: firstGroup?.title || "",
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Group Tables</h1>
          <p className=" text-gray-500">
            Manage groups and their options for your company.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            label="Manage Groups"
            icon="pi pi-cog"
            outlined
            onClick={() => setOpenManageGroupDialog(true)}
          />
          <Button
            icon="pi pi-plus"
            text
            tooltip="Create New Group"
            tooltipOptions={{ position: "top" }}
            aria-label="Create"
            onClick={() => {
              setOpenCreateDialog(true);
            }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mb-8 gap-12">
        <InputText
          placeholder="Search by name, code or description..."
          className="w-full md:w-[500px]"
        />
        <div className="flex items-center gap-2">
          <Button label="Filter" icon="pi pi-filter" outlined />
          <Button
            label="Create"
            icon="pi pi-plus"
            onClick={() => {
              setGroupFormState({ mode: "create", default: null });
              setOpenGroupFormDialog(true);
            }}
          />
        </div>
      </div>
      <Card className="px-3 border border-b-[1px] border-gray-100">
        <GroupTable
          groupId={group.id}
          groups={groups}
          onSelectTab={(tab) => setGroup(tab)}
          onSelectOption={(option) => {
            setOpenGroupFormDialog(true);
            setGroupFormState({ mode: "edit", default: option });
          }}
          onErrorCb={(error) => {
            toast.current?.show({
              severity: "error",
              summary: "Error",
              detail: error?.message || "Failed to delete option",
              life: 4000,
            });
          }}
          onSuccessCb={() => {
            toast.current?.show({
              severity: "success",
              summary: "Success",
              detail: "Option deleted successfully",
              life: 3000,
            });
          }}
        />
      </Card>

      <Dialog
        visible={openManageGroupDialog}
        onHide={() => {
          if (!openManageGroupDialog) return;
          setOpenManageGroupDialog(false);
        }}
        style={{ width: "35vw" }}
        onClose={() => setOpenManageGroupDialog(false)}
        renderedContent={
          <>
            <ManageGroups
              groups={groups}
              onCancel={() => setOpenManageGroupDialog(false)}
              onCreate={() => setOpenCreateDialog(true)}
            />
          </>
        }
      />

      <Dialog
        visible={openCreateDialog}
        onHide={() => {
          if (!openCreateDialog) return;
          setOpenCreateDialog(false);
        }}
        style={{ width: "30vw" }}
        onClose={() => setOpenCreateDialog(false)}
        renderedContent={
          <GroupForm
            onCancel={() => setOpenCreateDialog(false)}
            onSuccessCb={(response) => {
              toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: `${response.title} group created successfully`,
                life: 3000,
              });
              setOpenCreateDialog(false);
            }}
            onErrorCb={(error) => {
              toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error?.message || "Failed to create group",
                life: 4000,
              });
            }}
          />
        }
      />

      <Dialog
        visible={openGroupFormDialog}
        onHide={() => {
          if (!openGroupFormDialog) return;
          setOpenGroupFormDialog(false);
        }}
        style={{ width: "30vw" }}
        onClose={() => setOpenGroupFormDialog(false)}
        renderedContent={
          <GroupOptionForm
            mode={groupFormState.mode}
            defaultGroupOption={groupFormState.default}
            group={group}
            onCancel={() => setOpenGroupFormDialog(false)}
            onSuccessCb={(response) => {
              toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: `${response.name} option ${
                  groupFormState.mode === "create" ? "created" : "updated"
                } successfully`,
                life: 3000,
              });
              setOpenGroupFormDialog(false);
            }}
            onErrorCb={(error) => {
              toast.current?.show({
                severity: "error",
                summary: "Error",
                detail:
                  error?.message ||
                  `Failed to ${
                    groupFormState.mode === "create" ? "created" : "updated"
                  } option`,
                life: 4000,
              });
            }}
          />
        }
      />

      <Toast ref={toast} />
    </>
  );
};

export default GroupTablesView;
