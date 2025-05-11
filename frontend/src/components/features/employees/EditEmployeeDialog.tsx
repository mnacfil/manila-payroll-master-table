import Dialog from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onClose: () => void;
};

const EditEmployeeDialog = ({ open, onClose }: Props) => {
  return <Dialog visible={open} onHide={onClose} content={<>Hello World</>} />;
};

export default EditEmployeeDialog;
