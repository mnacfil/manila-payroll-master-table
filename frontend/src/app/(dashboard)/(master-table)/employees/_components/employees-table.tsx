"use client";

import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { Button } from "primereact/button";
import {
  ColumnFilterElementTemplateOptions,
  ColumnProps,
} from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import Alert from "@/components/ui/alert";
import { useEmployees } from "@/hooks/employees/useEmployees";
import { Tag } from "primereact/tag";
import { formatDate, formatSalary } from "@/lib/utils";
import { Employee } from "@/api/employees/types";
import { Toast } from "primereact/toast";
import Dialog from "@/components/ui/dialog";
import EmployeeForm from "./employee-form";
import Link from "next/link";
import { PATHS } from "@/api/path";
import { DataTableBaseProps } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";

const getSeverity = (status: number) => {
  switch (status) {
    case 1:
      return "success";

    case 0:
      return "danger";
  }
};
const statuses = [1, 0];

type Props = {
  onSelectedEmployees: (employees: Employee[]) => void;
  tableProps?: DataTableBaseProps<any>;
};

const EmployeesTable = ({ onSelectedEmployees, tableProps = {} }: Props) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [selected, setSelected] = useState<Employee | null>(null);
  const toast = useRef<Toast | null>(null);

  const { isError, isPending, employees, deleteMutation } = useEmployees();

  const StatusItemTemplate = (option: any) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };
  const StatusRowFilterTemplate = ({
    options,
  }: {
    options: ColumnFilterElementTemplateOptions;
  }) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        itemTemplate={StatusItemTemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
        style={{ minWidth: "12rem" }}
      />
    );
  };
  const StatusBodyTemplate = ({ rowData }: { rowData: Employee }) => {
    return (
      <Tag
        value={rowData.active === 1 ? "Active" : "Not Active"}
        severity={getSeverity(rowData.active)}
      />
    );
  };
  const DateFilterTemplate = ({
    options,
  }: {
    options: ColumnFilterElementTemplateOptions;
  }) => {
    console.log(new Date(options.value));
    return <></>;
    // return (
    //   // <Calendar
    //   //   value={options.value}
    //   //   onChange={(e) => options.filterCallback(e.value, options.index)}
    //   //   dateFormat="mm/dd/yy"
    //   //   placeholder="mm/dd/yyyy"
    //   //   mask="99/99/9999"
    //   // />
    // );
  };
  const DateBodyTemplate = ({ rowData }: { rowData: Employee }) => {
    return formatDate(rowData.date_hired);
  };
  const columns: ColumnProps[] = [
    {
      field: "first_name",
      header: "First Name",
      // filter: true,
      sortable: true,
    },
    {
      field: "last_name",
      header: "Last Name",
      // filter: true,
      sortable: true,
    },
    {
      field: "email",
      header: "Email",
      // filter: true,
      sortable: true,
    },
    {
      field: "position",
      header: "Position",
      sortable: true,
    },
    {
      field: "department",
      header: "Department",
      sortable: true,
    },
    {
      field: "date_hired",
      header: "Date Hired",
      dataType: "date",
      // filter: true,
      body: (rowData) => <DateBodyTemplate rowData={rowData} />,
      filterElement: (options) => <DateFilterTemplate options={options} />,
    },
    {
      header: "Salary",
      // filter: true,
      body: (rowData: Employee) => {
        return <p>{formatSalary(Number(rowData?.salary))}</p>;
      },
    },
    {
      field: "active",
      header: "Status",
      align: "center",
      sortable: true,
      showFilterMenu: false,
      filterMenuStyle: { width: "14rem" },
      style: { minWidth: "12rem" },
      filterElement: (options) => <StatusRowFilterTemplate options={options} />,
      body: (rowData: Employee) => <StatusBodyTemplate rowData={rowData} />,
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
                  <Link href={`${PATHS.EMPLOYEES}/${rowData.emp_id}`}>
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
                  </Link>
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
        onSelected={(list) => {
          onSelectedEmployees(list);
        }}
        {...tableProps}
        dataKey="emp_id"
      />

      <Dialog
        visible={openEditDialog}
        onHide={() => {
          if (!openEditDialog) return;
          setOpenEditDialog(false);
        }}
        position="center"
        style={{ width: "50vw" }}
        onClose={() => setOpenEditDialog(false)}
        renderedContent={
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
