import Table from "@/components/ui/table";
import { ColumnProps } from "primereact/column";

const employees = [
  {
    name: "Melvin",
    code: "123",
    category: "cst",
    quantity: 123,
  },
  {
    name: "John",
    code: "23131312",
    category: "cot",
    quantity: 1,
  },
  {
    name: "Cal",
    code: "132asd",
    category: "MST",
    quantity: 44,
  },
  {
    name: "Sen",
    code: "ada123123",
    category: "people",
    quantity: 69,
  },
  {
    name: "Jor",
    code: "dasd23232",
    category: "cst",
    quantity: 22,
  },
];

const columns: ColumnProps[] = [
  {
    field: "name",
    header: "Name",
  },
  {
    field: "code",
    header: "Code",
  },
  {
    field: "category",
    header: "Category",
  },
  {
    field: "quantity",
    header: "Quantity",
  },
  {
    header: "Action",
    align: "center",
    body: (rowData) => {
      return (
        <i
          className="pi pi-ellipsis-h cursor-pointer"
          aria-label="more-action"
          role="button"
        ></i>
      );
    },
  },
];

const EmployeesContent = () => {
  return (
    <div>
      <Table data={employees} columns={columns} />
    </div>
  );
};

export default EmployeesContent;
