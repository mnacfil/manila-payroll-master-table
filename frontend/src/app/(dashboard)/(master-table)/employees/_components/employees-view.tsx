"use client";

import { Button } from "primereact/button";
import EmployeesTable from "./employees-table";
import { useRef, useState } from "react";
import Dialog from "@/components/ui/dialog";
import EmployeeForm from "./employee-form";
import { Toast } from "primereact/toast";
import { Employee } from "@/api/employees/types";
import { useEmployees } from "@/hooks/employees/useEmployees";
import Alert from "@/components/ui/alert";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { employeeGlobalFilterFields } from "@/lib/constant";
import { useEmployeesFilter } from "@/hooks/employees/useEmployeesFilter";

const EmployeesView = () => {
  const toast = useRef<Toast | null>(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteMultipleAlert, setOpenDeleteMultipleAlert] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const { deleteMultipleMutation } = useEmployees();
  const {
    filters,
    globalFilterValue,
    clearFilter,
    setFilters,
    onGlobalFilterChange,
  } = useEmployeesFilter();

  const renderHeader = () => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by name or email"
            className="w-full lg:w-72"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-gray-500">
            Manage your employees, add new ones, or remove existing ones.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setOpenCreateDialog(true)}>
            <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
            <span className="font-medium">Create</span>
          </Button>
          <Button
            severity="danger"
            disabled={selectedEmployees.length === 0}
            onClick={() =>
              selectedEmployees.length > 0 && setOpenDeleteMultipleAlert(true)
            }
          >
            <i
              className="pi pi-trash mr-2"
              style={{ fontSize: "0.875rem" }}
            ></i>
            <span className="font-medium">Delete</span>
          </Button>
        </div>
      </div>

      <div className="mt-6 h-full pb-6">
        <EmployeesTable
          onSelectedEmployees={setSelectedEmployees}
          tableProps={{
            header,
            filters,
            globalFilterFields: employeeGlobalFilterFields,
            onFilter: (e: any) => setFilters(e.filters),
          }}
        />
      </div>

      <Dialog
        visible={openCreateDialog}
        position="center"
        style={{ width: "40vw" }}
        onHide={() => setOpenCreateDialog(false)}
        onClose={() => setOpenCreateDialog(false)}
        renderedContent={
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
                detail: error?.message || "Failed to create employee",
                life: 4000,
              });
            }}
          />
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
        onHide={() => setOpenDeleteMultipleAlert(false)}
        onCancel={() => setOpenDeleteMultipleAlert(false)}
        onContinue={() => {
          if (selectedEmployees.length > 0) {
            const ids = selectedEmployees.map((emp) => emp.emp_id.toString());
            deleteMultipleMutation.mutate(ids, {
              onSuccess: () => {
                toast.current?.show({
                  severity: "success",
                  summary: "Deleted successfully",
                  detail: `${selectedEmployees.length} employees deleted.`,
                });
              },
              onError: (error) => {
                toast.current?.show({
                  severity: "error",
                  summary: "Error",
                  detail: error?.message || "Failed to delete employees",
                });
              },
            });
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
