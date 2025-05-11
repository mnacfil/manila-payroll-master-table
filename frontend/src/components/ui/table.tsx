import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

type Props = {};

const products = [
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

const Table = () => {
  return (
    <DataTable value={products} showGridlines>
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
      <Column
        header="Action"
        align={"center"}
        body={(rowData) => {
          return (
            <i
              className="pi pi-ellipsis-h cursor-pointer"
              aria-label="more-action"
              role="button"
            ></i>
          );
        }}
      ></Column>
    </DataTable>
  );
};

export default Table;
