import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import EditEmployeeDialog from "./EditEmployeeDialog";
import Alert from "@/components/ui/alert";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { Tag } from "primereact/tag";
import { formatDate } from "@/lib/utils";
import { Employee } from "@/api/employees/types";

const EmployeesContent = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [selectedList, setSelectedList] = useState<Employee[]>([]);

  const { isError, isPending, employees } = useEmployees();

  const columns: ColumnProps[] = [
    {
      field: "first_name",
      header: "First Name",
    },
    {
      field: "last_name",
      header: "Last Name",
    },
    {
      field: "date_hired",
      header: "Date Hired",
      body: (rowData: Employee) => {
        return <p>{formatDate(rowData?.created_at)}</p>;
      },
    },
    {
      field: "salary",
      header: "Salary",
    },
    {
      field: "active",
      header: "Status",
      align: "center",
      body: (rowData: Employee) => {
        return (
          <Tag
            severity={rowData?.active === 1 ? "success" : "danger"}
            value={rowData?.active === 1 ? "Active" : "Terminated"}
          ></Tag>
        );
      },
    },
    {
      header: "Action",
      align: "center",
      body: (rowData: Employee) => {
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

  if (isError) {
    return (
      <div>
        <h2>Something went wrong while getting employees data.</h2>
      </div>
    );
  }

  if (isPending) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Table
        data={employees || []}
        columns={columns}
        dataKey="emp_id"
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
