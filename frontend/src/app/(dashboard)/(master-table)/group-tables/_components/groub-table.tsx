import { Group, Option } from "@/api/group-tables/types";
import Alert from "@/components/ui/alert";
import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { useGroups } from "@/hooks/group-tables/useGroups";
import { DEFAULT_GROUP_ICON } from "@/lib/constant";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef, useState } from "react";

type Props = {
  groupId: string;
  groups: Group[];
  onSelectTab: (group: Omit<Group, "options">) => void;
  onSelectOption: (option: Option) => void;
  onSuccessCb: () => void;
  onErrorCb: (error: Error) => void;
};

const GroupTable = ({
  groupId,
  groups,
  onSelectTab,
  onSelectOption,
  onSuccessCb,
  onErrorCb,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Option | null>(null);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const { deleteOptionMutation } = useGroups();

  const columns: ColumnProps[] = [
    {
      field: "code",
      header: "Code ID",
    },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "description",
      header: "Description",
    },
    {
      header: "Action",
      align: "center",
      body: (rowData: Option) => {
        const op = useRef<OverlayPanel | null>(null);
        return (
          <>
            <DropdownMenu
              op={op}
              content={
                <div className="flex flex-col gap-1">
                  <p className="mb-2 font-medium">Option Actions</p>
                  <Button
                    label="Edit"
                    icon="pi pi-pencil"
                    severity="success"
                    text
                    style={{ width: "8rem" }}
                    onClick={() => {
                      setSelected(rowData);
                      onSelectOption(rowData);
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
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index);
          onSelectTab({
            id: groups[e.index]?.id,
            title: groups[e.index]?.title,
          });
        }}
      >
        {groups.map((group) => (
          <TabPanel
            key={group.id}
            header={group.title}
            leftIcon={`pi pi-${DEFAULT_GROUP_ICON} mr-2`}
          >
            <Table
              data={group.options || []}
              columns={columns}
              dataKey="id"
              onSelected={(list) => {}}
            />
          </TabPanel>
        ))}
      </TabView>

      <Alert
        visible={openDeleteAlert}
        title="Are you absolutely sure?"
        message={
          <p>
            This action will permanently delete
            <strong>{` ${selected?.name} `}</strong> option. This action cannot
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
            deleteOptionMutation.mutate(
              { groupId, optionId: selected.id },
              {
                onSuccess: () => {
                  setOpenDeleteAlert(false);
                  onSuccessCb();
                },
                onError: (error) => {
                  onErrorCb(error);
                },
              }
            );
            setSelected(null);
            setOpenDeleteAlert(false);
          }
        }}
      />
    </>
  );
};

export default GroupTable;
