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

const GroupTablesView = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openManageGroupDialog, setOpenManageGroupDialog] = useState(false);
  const toast = useRef<Toast | null>(null);

  const { isPending, isError, groups } = useGroups();

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
        <Button
          label="Manage Groups"
          icon="pi pi-cog"
          outlined
          onClick={() => setOpenManageGroupDialog(true)}
        />
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
              setOpenCreateDialog(true);
            }}
          />
        </div>
      </div>
      <Card className="px-3 border border-b-[1px] border-gray-100">
        <GroupTable groups={groups} />
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
            <ManageGroups groups={groups} />
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
      <Toast ref={toast} />
    </>
  );
};

export default GroupTablesView;
