"use client";

import { Group } from "@/api/group-tables/types";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { DEFAULT_GROUP_ICON } from "@/lib/constant";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";

type Props = {
  groups: Group[];
};

const ManageGroups = ({ groups }: Props) => {
  const [selected, setSelected] = useState(false);
  const columns: ColumnProps[] = [
    {
      header: "Icon",
      body: () => (
        <div className="flex justify-center">
          <i
            className={`pi pi-${DEFAULT_GROUP_ICON}`}
            style={{ fontSize: "1rem" }}
          ></i>
        </div>
      ),
    },
    {
      field: "title",
      header: "Title",
    },
    {
      header: "Action",
      align: "center",
      body: (rowData: any) => {
        const op = useRef<OverlayPanel | null>(null);
        return (
          <>
            <DropdownMenu
              op={op}
              content={
                <div className="flex flex-col gap-1">
                  <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    severity="success"
                    text
                    style={{ width: "8rem" }}
                    onClick={() => {
                      setSelected(rowData);
                      // setOpenEditDialog(true);
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
                      // setOpenDeleteAlert(true);
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
    <>
      <div className="space-y-1 mb-4">
        <h2 className="font-bold text-lg">Manage Groups</h2>
        <p className="text-gray-600 text-sm">
          Create, edit, or delete groups. Groups appear as tabs in the main
          interface
        </p>
      </div>
      <Table
        data={groups}
        columns={columns}
        dataKey="id"
        mode="single"
        onSelected={(list) => {
          //   onSelectedEmployees(list);
        }}
      />
    </>
  );
};

export default ManageGroups;
