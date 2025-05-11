import { Column, ColumnProps } from "primereact/column";
import { DataTable } from "primereact/datatable";

type Props = {
  data: any[];
  columns: ColumnProps[];
};

const Table = ({ columns, data }: Props) => {
  return (
    <DataTable value={data} showGridlines>
      {columns.map((item) => (
        <Column
          field={item.field}
          header={item.header}
          body={item.body}
        ></Column>
      ))}
    </DataTable>
  );
};

export default Table;
