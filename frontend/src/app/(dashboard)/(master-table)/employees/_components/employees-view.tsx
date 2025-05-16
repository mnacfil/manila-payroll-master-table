"use client";

import { Button } from "primereact/button";
import EmployeesTable from "./employees-table";
import Filters from "./filters";
import { useRef, useState } from "react";
import Dialog from "@/components/ui/dialog";
import EmployeeForm from "./employee-form";
import { Toast } from "primereact/toast";
import { Employee } from "@/api/employees/types";
import { useEmployees } from "@/hooks/employees/useEmployees";
import Alert from "@/components/ui/alert";

const EmployeesView = () => {
  const toast = useRef<Toast | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteMultipleAlert, setOpenDeleteMultipleAlert] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);

  const { deleteMutation, deleteMultipleMutation } = useEmployees();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employees</h1>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpenCreateDialog(true)}>
            <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
            <span className="font-medium">Create</span>
          </Button>
          <Button
            severity="danger"
            disabled={selectedEmployees.length === 0}
            onClick={() => {
              if (selectedEmployees.length > 0) {
                setOpenDeleteMultipleAlert(true);
              }
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
      <Filters />
      <div className="mt-6">
        <EmployeesTable
          onSelectedEmployees={(employees) => {
            setSelectedEmployees(employees);
          }}
        />
      </div>
      <Dialog
        visible={openCreateDialog}
        onHide={() => {
          if (!openCreateDialog) return;
          setOpenCreateDialog(false);
        }}
        position="center"
        style={{ width: "50vw" }}
        onClose={() => setOpenCreateDialog(false)}
        renderedContent={
          <>
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
          </>
        }
      />
      <Alert
        visible={openDeleteMultipleAlert}
        title="Are you absolutely sure?"
        message={
          <p>
            This action will permanently delete
            <strong>{` ${selectedEmployees.length} selected employees.`}</strong>
          </p>
        }
        onHide={() => {
          setSelectedEmployees([]);
          setOpenDeleteMultipleAlert(false);
        }}
        onCancel={() => {
          setSelectedEmployees([]);
          setOpenDeleteMultipleAlert(false);
        }}
        onContinue={() => {
          if (selectedEmployees.length > 0) {
            if (selectedEmployees.length === 1) {
              deleteMutation.mutate(selectedEmployees[0]?.emp_id, {
                onSuccess: () => {
                  if (toast.current) {
                    toast.current.show({
                      severity: "success",
                      summary: "Success",
                      detail:
                        "Employee has beed removed from your master list.",
                    });
                  }
                },
                onError: (error) => {
                  if (toast.current) {
                    toast.current.show({
                      severity: "error",
                      summary: "Error",
                      detail:
                        error?.message ||
                        "Something went wrong while deleting employee",
                    });
                  }
                },
              });
            } else {
              const ids = selectedEmployees.map((emp) => emp.emp_id.toString());
              deleteMultipleMutation.mutate(ids, {
                onSuccess: () => {
                  if (toast.current) {
                    toast.current.show({
                      severity: "success",
                      summary: "Deleted successfully",
                      detail: `${selectedEmployees.length} selected employees deleted.`,
                    });
                  }
                },
                onError: (error) => {
                  if (toast.current) {
                    toast.current.show({
                      severity: "error",
                      summary: "Error",
                      detail:
                        error?.message ||
                        "Something went wrong while deleting employee",
                    });
                  }
                },
              });
            }
            setSelectedEmployees([]);
            setOpenDeleteMultipleAlert(false);
          }
        }}
      />
      <Toast ref={toast} />
    </>
  );
};

export default EmployeesView;
