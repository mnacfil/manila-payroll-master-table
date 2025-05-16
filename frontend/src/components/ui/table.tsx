"use client";

import { Employee } from "@/api/employees/types";
import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";

type Props = {
  data: any[];
  columns: ColumnProps[];
  dataKey: string;
  mode?: "single" | "multiple";
  onSelected?: (list: Employee[]) => void;
};

const Table = ({
  columns,
  data,
  dataKey,
  onSelected,
  mode = "multiple",
}: Props) => {
  const [selected, setSelected] = useState([]);
  return (
    <DataTable
      value={data}
      showGridlines
      dataKey={dataKey}
      selectionMode={"checkbox"}
      selection={selected}
      emptyMessage={"No data"}
      {...(data.length > 10 && {
        paginator: true,
      })}
      rows={10}
      rowsPerPageOptions={[10, 20, 30]}
      selectionPageOnly
      onSelectionChange={(e: any) => {
        onSelected?.(e.value);
        setSelected(e.value);
      }}
    >
      {mode === "multiple" && (
        <Column
          key={"multiple"}
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
      )}
      {columns.map((item, i) => (
        <Column
          key={item.field}
          field={item.field}
          header={item.header}
          body={item.body}
        ></Column>
      ))}
    </DataTable>
  );
};

export default Table;
