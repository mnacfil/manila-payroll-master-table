import Dialog from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddEmployeeDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog
      visible={open}
      onHide={onClose}
      content={
        <>
          <div>
            <h2>Add Employee form</h2>
          </div>
        </>
      }
    />
  );
};

export default AddEmployeeDialog;
