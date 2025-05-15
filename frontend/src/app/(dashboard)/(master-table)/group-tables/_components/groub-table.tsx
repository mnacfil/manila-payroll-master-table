import DropdownMenu from "@/components/ui/dropdown-menu";
import Table from "@/components/ui/table";
import { Button } from "primereact/button";
import { ColumnProps } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { TabPanel, TabView } from "primereact/tabview";
import { useRef, useState } from "react";

const data = {
  groups: [
    {
      group: "Department",
      table: "department",
      fields: [
        { id: 1, name: "Engineering" },
        { id: 2, name: "Human Resources" },
        { id: 3, name: "Finance" },
        { id: 4, name: "Marketing" },
      ],
    },
    {
      group: "Position",
      table: "position",
      fields: [
        { id: 1, name: "Software Engineer" },
        { id: 2, name: "HR Manager" },
        { id: 3, name: "Accountant" },
        { id: 4, name: "Marketing Specialist" },
      ],
    },
    {
      group: "Location",
      table: "location",
      fields: [
        { id: 1, name: "Makati" },
        { id: 2, name: "Cebu" },
        { id: 3, name: "Davao" },
        { id: 4, name: "Remote" },
      ],
    },
  ],
};

const GroupTable = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const columns: ColumnProps[] = [
    {
      field: "id",
      header: "ID",
    },
    {
      field: "name",
      header: "Name",
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
                    label="View"
                    icon="pi pi-eye"
                    severity="info"
                    text
                    style={{ width: "8rem" }}
                    onClick={() => {
                      //   setSelected(rowData);
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
                      // setSelected(rowData);
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
                      // setSelected(rowData);
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

  console.log(activeIndex);

  return (
    <>
      <TabView
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {data.groups.map((group) => (
          <TabPanel key={group.group} header={group.group}>
            <Table
              data={group.fields || []}
              columns={columns}
              dataKey="id"
              onSelected={(list) => {
                //   onSelectedEmployees(list);
              }}
            />
          </TabPanel>
        ))}
      </TabView>
    </>
  );
};

export default GroupTable;
