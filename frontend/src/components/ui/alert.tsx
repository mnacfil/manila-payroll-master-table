import { ConfirmDialog, ConfirmDialogProps } from "primereact/confirmdialog";
import { ReactNode } from "react";

type Props = {
  title: string;
  onHide: () => void;
  onCancel: () => void;
  onContinue: () => void;
} & ConfirmDialogProps;
const Alert = ({
  title,
  visible,
  message,
  onHide,
  onCancel,
  onContinue,
}: Props) => {
  return (
    <ConfirmDialog
      group="declarative"
      visible={visible}
      header={title}
      message={message}
      acceptClassName="p-button-danger"
      rejectClassName="mr-2"
      style={{ width: "30vw" }}
      accept={onContinue}
      reject={onCancel}
      onHide={onHide}
    />
  );
};

export default Alert;
