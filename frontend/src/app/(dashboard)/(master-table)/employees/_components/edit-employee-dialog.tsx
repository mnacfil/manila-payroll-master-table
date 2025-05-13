"use client";

import Dialog from "@/components/ui/dialog";

type Props = {
  open: boolean;
  employee: any;
  onClose: () => void;
};

const EditEmployeeDialog = ({ open, employee, onClose }: Props) => {
  return (
    <Dialog
      visible={open}
      onHide={onClose}
      content={
        <div>
          <h2>Edit Employee Form</h2>
          <p>{employee?.name}</p>
        </div>
      }
    />
  );
};

export default EditEmployeeDialog;
