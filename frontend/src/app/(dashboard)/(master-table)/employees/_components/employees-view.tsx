"use client";

import { Button } from "primereact/button";
import EmployeesTable from "./employees-table";
import Filters from "./filters";
import { useRef, useState } from "react";
import Dialog from "@/components/ui/dialog";
import EmployeeForm from "./employee-form";
import { Toast } from "primereact/toast";

const EmployeesView = () => {
  const toast = useRef<Toast | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button onClick={() => setOpenCreateDialog(true)}>
          <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
          <span className="font-medium">Create</span>
        </Button>
      </div>
      <Filters />
      <div className="mt-6">
        <EmployeesTable />
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
            <EmployeeForm
              onSuccessCb={() => {
                setOpenCreateDialog(false);
                toast.current?.show({
                  severity: "success",
                  summary: "Success",
                  detail: "Employee created successfully",
                  life: 3000,
                });
              }}
              onErrorCb={(error) => {
                toast.current?.show({
                  severity: "error",
                  summary: "Error",
                  detail: error?.message || "Failed to update employee",
                  life: 4000,
                });
              }}
            />
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

export default EmployeesView;
