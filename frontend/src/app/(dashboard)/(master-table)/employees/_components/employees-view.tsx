"use client";
import AddEmployeeDialog from "@/components/features/employees/AddEmployeeDialog";
import EmployeesContent from "@/components/features/employees/EmployeesContent";
import EmployeesFilters from "@/components/features/employees/EmployeesFilters";
import { Button } from "primereact/button";
import { useState } from "react";

const EmployeesView = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button onClick={() => setOpenAddDialog(true)}>
          <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
          <span className="font-medium">Add Employee</span>
        </Button>
      </div>
      <EmployeesFilters />
      <div className="mt-6">
        <EmployeesContent />
      </div>
      <AddEmployeeDialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
        }}
      />
    </>
  );
};

export default EmployeesView;
