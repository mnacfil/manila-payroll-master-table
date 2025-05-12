import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import EditEmployeeDialog from "./EditEmployeeDialog";
import Alert from "@/components/ui/alert";

// Todo - Modify the any type to corresponding data type

const employees = [
  {
    id: "1",
    name: "Melvin",
    code: "123",
    category: "cst",
    quantity: 123,
  },
  {
    id: "2",
    name: "John",
    code: "23131312",
    category: "cot",
    quantity: 1,
  },
  {
    id: "3",
    name: "Cal",
    code: "132asd",
    category: "MST",
    quantity: 44,
  },
  {
    id: "4",
    name: "Sen",
    code: "ada123123",
    category: "people",
    quantity: 69,
  },
  {
    id: "5",
    name: "Jor",
    code: "dasd23232",
    category: "cst",
    quantity: 22,
  },
  {
    id: "6",
    name: "Kobe",
    code: "123",
    category: "cst",
    quantity: 123,
  },
  {
    id: "7",
    name: "Jordan",
    code: "23131312",
    category: "cot",
    quantity: 1,
  },
  {
    id: "8",
    name: "Lebron",
    code: "132asd",
    category: "MST",
    quantity: 44,
  },
  {
    id: "9",
    name: "Steph",
    code: "ada123123",
    category: "people",
    quantity: 69,
  },
  {
    id: "10",
    name: "Shaq",
    code: "dasd23232",
    category: "cst",
    quantity: 22,
  },
];

const EmployeesContent = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [selectedList, setSelectedList] = useState<any[]>([]);

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
        const op = useRef<OverlayPanel | null>(null);
        return (
          <>
            <DropdownMenu
              op={op}
              content={
                <div className="flex flex-col gap-1">
                  <Button
                    label="View"
                    icon="pi pi-eye"
                    severity="info"
                    text
                    style={{ width: "8rem" }}
                    onClick={() => {
                      setSelected(rowData);
                      if (op.current) {
                        op.current.hide();
                      }
                    }}
                  />
                  <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    severity="success"
                    text
                    style={{ width: "8rem" }}
                    onClick={() => {
                      setSelected(rowData);
                      setOpenEditDialog(true);
                      if (op.current) {
                        op.current.hide();
                      }
                    }}
                  />
                  <Button
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    text
                    style={{ width: "8rem" }}
                    onClick={() => {
                      setSelected(rowData);
                      setOpenDeleteAlert(true);
                      if (op.current) {
                        op.current.hide();
                      }
                    }}
                  />
                </div>
              }
              trigger={
                <i
                  className="pi pi-ellipsis-h cursor-pointer"
                  aria-label="more-action"
                  role="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (op.current) {
                      op?.current.toggle(e);
                    }
                  }}
                ></i>
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        data={employees}
        columns={columns}
        onSelected={(list) => {
          setSelectedList(list);
        }}
      />

      <EditEmployeeDialog
        open={openEditDialog}
        employee={selected}
        onClose={() => {
          setSelected(null);
          setOpenEditDialog(false);
        }}
      />
      <Alert
        visible={openDeleteAlert}
        title="Are you sure?"
        description="This action cannot be undone"
        onHide={() => {
          setSelected(null);
          setOpenDeleteAlert(false);
        }}
        onCancel={() => {
          setSelected(null);
          setOpenDeleteAlert(false);
        }}
        onContinue={() => {
          // Todo: call delete mutation
          setSelected(null);
          setOpenDeleteAlert(false);
        }}
      />
    </div>
  );
};

export default EmployeesContent;
