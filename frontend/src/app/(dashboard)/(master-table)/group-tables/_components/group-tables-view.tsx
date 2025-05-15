"use client";

import { Button } from "primereact/button";
import GroupTable from "./groub-table";
import Dialog from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import GroupTableForm from "./group-table-form";

const GroupTablesView = () => {
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const toast = useRef<Toast | null>(null);
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Group Tables</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpenCreateDialog(true)}>
            <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
            <span className="font-medium">Create</span>
          </Button>
          <Button
            severity="danger"
            // disabled={selectedEmployees.length === 0}
            onClick={() => {
              // if (selectedEmployees.length > 0) {
              //   setOpenDeleteMultipleAlert(true);
              // }
            }}
          >
            <i
              className="pi pi-trash mr-2"
              style={{ fontSize: "0.875rem" }}
            ></i>
            <span className="font-medium">Delete</span>
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <GroupTable />
      </div>

      <Dialog
        visible={openCreateDialog}
        onHide={() => {
          if (!openCreateDialog) return;
          setOpenCreateDialog(false);
        }}
        position="center"
        style={{ width: "50vw" }}
        content={
          <div className="relative">
            <GroupTableForm tabTitle={"Tab title"} />
            <i
              role="button"
              aria-label="close"
              className="pi pi-times absolute top-5 right-5 cursor-pointer"
              onClick={() => setOpenCreateDialog(false)}
            ></i>
          </div>
        }
      />
      <Toast ref={toast} />
    </>
  );
};

export default GroupTablesView;
