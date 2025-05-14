"use client";

import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import Alert from "@/components/ui/alert";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { Tag } from "primereact/tag";
import { formatDate } from "@/lib/utils";
import { Employee } from "@/api/employees/types";
import { Toast } from "primereact/toast";
import Dialog from "@/components/ui/dialog";
import EmployeeForm from "./employee-form";

const EmployeesTable = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [selectedList, setSelectedList] = useState<Employee[]>([]);
  const toast = useRef<Toast | null>(null);

  const { isError, isPending, employees, deleteMutation } = useEmployees();

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
      field: "email",
      header: "Email",
    },
    {
      field: "date_hired",
      header: "Date Hired",
      body: (rowData: Employee) => {
        return <p>{formatDate(rowData?.date_hired)}</p>;
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

      <Dialog
        visible={openEditDialog}
        onHide={() => {
          if (!openEditDialog) return;
          setOpenEditDialog(false);
        }}
        position="center"
        style={{ width: "50vw" }}
        closeIcon
        content={
          <>
            <EmployeeForm
              mode="edit"
              defaultData={selected}
              onSuccessCb={() => {
                setOpenEditDialog(false);
                toast.current?.show({
                  severity: "success",
                  summary: "Success",
                  detail: "Employee updated successfully",
                  life: 3000,
                });
              }}
              onErrorCb={(error) => {
                toast.current?.show({
                  severity: "error",
                  summary: "Error",
                  detail: error?.message || "Failed to update employee",
                  life: 4000,
                });
              }}
            />
          </>
        }
      />
      <Alert
        visible={openDeleteAlert}
        title="Are you absolutely sure?"
        message={
          <p>
            "This action will permanently delete the employee record for{" "}
            <strong>{`${selected?.first_name} ${selected?.last_name}`}</strong>.
            This action cannot be undone."
          </p>
        }
        onHide={() => {
          setSelected(null);
          setOpenDeleteAlert(false);
        }}
        onCancel={() => {
          setSelected(null);
          setOpenDeleteAlert(false);
        }}
        onContinue={() => {
          if (selected) {
            deleteMutation.mutate(selected?.emp_id, {
              onSuccess: () => {
                if (toast.current) {
                  toast.current.show({
                    severity: "success",
                    summary: "Deleted successfully",
                    detail: "Employee has beed removed from your master list.",
                  });
                }
              },
            });
            setSelected(null);
            setOpenDeleteAlert(false);
          }
        }}
      />
      <Toast ref={toast} />
    </div>
  );
};

export default EmployeesTable;
