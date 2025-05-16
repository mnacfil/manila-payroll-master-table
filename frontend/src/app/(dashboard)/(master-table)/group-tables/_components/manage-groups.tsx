"use client";

import { Group } from "@/api/group-tables/types";
import Alert from "@/components/ui/alert";
import Dialog from "@/components/ui/dialog";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { useGroups } from "@/hooks/group-tables/useGroups";
import { DEFAULT_GROUP_ICON } from "@/lib/constant";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import GroupForm from "./group-form";

type Props = {
  groups: Group[];
  onCreate: () => void;
  onCancel: () => void;
};

const ManageGroups = ({ groups, onCreate, onCancel }: Props) => {
  const [selected, setSelected] = useState<Group | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const toast = useRef<Toast | null>(null);
  const { deleteMutation } = useGroups();
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
      body: (rowData: Group) => {
        const op = useRef<OverlayPanel | null>(null);
        return (
          <>
            <DropdownMenu
              op={op}
              content={
                <div className="flex flex-col gap-1">
                  <p className="mb-2">Group Action</p>
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
        onSelected={(list) => {}}
      />
      <div className="flex items-center justify-between mt-4">
        <Button label="Close" outlined onClick={onCancel} />
        <Button label="Create" icon="pi pi-plus" onClick={onCreate} />
      </div>
      <Alert
        visible={openDeleteAlert}
        title="Are you absolutely sure?"
        message={
          <p>
            This action will permanently delete
            <strong>{` ${selected?.title} `}</strong> group. This action cannot
            be undone.
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
            deleteMutation.mutate(selected?.id, {
              onSuccess: () => {
                if (toast.current) {
                  toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Group has beed removed.",
                  });
                }
              },
              onError: (error) => {
                if (toast.current) {
                  toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: error?.message || "Failed to delete group",
                  });
                }
              },
            });
            setSelected(null);
            setOpenDeleteAlert(false);
          }
        }}
      />

      <Dialog
        visible={openEditDialog}
        onHide={() => {
          if (!openEditDialog) return;
          setOpenEditDialog(false);
        }}
        style={{ width: "30vw" }}
        onClose={() => setOpenEditDialog(false)}
        renderedContent={
          <GroupForm
            mode="edit"
            defaultGroup={selected}
            onCancel={() => setOpenEditDialog(false)}
            onSuccessCb={(response) => {
              toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Group updated successfully",
                life: 3000,
              });
              setOpenEditDialog(false);
            }}
            onErrorCb={(error) => {
              toast.current?.show({
                severity: "error",
                summary: "Error",
                detail: error?.message || "Failed to update group",
                life: 4000,
              });
            }}
          />
        }
      />
      <Toast ref={toast} />
    </>
  );
};

export default ManageGroups;
