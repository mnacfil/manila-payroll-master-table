"use client";
import { Button } from "primereact/button";
import { useState } from "react";
import EmployeesTable from "./employees-table";
import Filters from "./filters";
import CreateEmployeeDialog from "./create-employee-dialog";

const EmployeesView = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button onClick={() => setOpenAddDialog(true)}>
          <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
          <span className="font-medium">Create</span>
        </Button>
      </div>
      <Filters />
      <div className="mt-6">
        <EmployeesTable />
      </div>
      <CreateEmployeeDialog
        open={openAddDialog}
        onClose={() => {
          setOpenAddDialog(false);
        }}
      />
    </>
  );
};

export default EmployeesView;
