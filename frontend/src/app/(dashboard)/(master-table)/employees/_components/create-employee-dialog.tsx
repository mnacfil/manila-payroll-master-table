"use client";

import Dialog from "@/components/ui/dialog";
import CreateEmployeeForm from "./create-employee-form";

type Props = {
  open: boolean;
  onClose: () => void;
};

const CreateEmployeeDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog
      visible={open}
      onHide={onClose}
      content={
        <>
          <div>
            <CreateEmployeeForm />
          </div>
        </>
      }
    />
  );
};

export default CreateEmployeeDialog;
