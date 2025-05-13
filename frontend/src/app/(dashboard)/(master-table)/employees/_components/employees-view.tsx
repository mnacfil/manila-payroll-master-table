import { Button } from "primereact/button";
import EmployeesTable from "./employees-table";
import Filters from "./filters";
import Link from "next/link";

const EmployeesView = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link href={"/employees/create"}>
          <Button>
            <i className="pi pi-plus mr-2" style={{ fontSize: "0.875rem" }}></i>
            <span className="font-medium">Create</span>
          </Button>
        </Link>
      </div>
      <Filters />
      <div className="mt-6">
        <EmployeesTable />
      </div>
    </>
  );
};

export default EmployeesView;
