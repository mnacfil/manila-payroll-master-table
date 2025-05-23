"use client";

import { Employee } from "@/api/employees/types";
import { Column, ColumnProps } from "primereact/column";
import { DataTable, DataTableBaseProps } from "primereact/datatable";
import { useState } from "react";

type Props = {
  data: any[];
  columns: ColumnProps[];
  dataKey: string;
  mode?: "single" | "multiple";
  onSelected?: (list: Employee[]) => void;
} & DataTableBaseProps<any>;

const Table = ({
  columns,
  data,
  dataKey,
  onSelected,
  mode = "multiple",
  ...otherProps
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
      // filterDisplay="row"
      sortMode="single"
      removableSort
      {...otherProps}
    >
      {mode === "multiple" && (
        <Column
          key={"multiple"}
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
      )}
      {columns.map((props, i) => (
        <Column key={i} {...props}></Column>
      ))}
    </DataTable>
  );
};

export default Table;
