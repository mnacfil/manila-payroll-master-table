"use client";
import EditEmployeeDialog from "@/components/features/employees/EditEmployeeDialog";
import EmployeesContent from "@/components/features/employees/EmployeesContent";
import EmployeesFilters from "@/components/features/employees/EmployeesFilters";
import Alert from "@/components/ui/alert";
import { Button } from "primereact/button";
import { useState } from "react";

const EmployeesPage = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button>
          <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
          <span className="font-medium">Add Employee</span>
        </Button>
      </div>
      <EmployeesFilters />
      <div className="mt-6">
        <EmployeesContent />
      </div>
      <EditEmployeeDialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
        }}
      />
      <Alert
        visible={openDeleteAlert}
        title="Are you sure?"
        description="This action cannot be undone"
        onHide={() => {
          setOpenDeleteAlert(false);
        }}
        onCancel={() => {}}
        onContinue={() => {}}
      />
    </>
  );
};

export default EmployeesPage;
