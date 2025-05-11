import { ConfirmDialog } from "primereact/confirmdialog";

type Props = {
  visible: boolean;
  title: string;
  description: string;
  onHide: () => void;
  onCancel: () => void;
  onContinue: () => void;
};

const Alert = ({
  visible,
  title,
  description,
  onHide,
  onCancel,
  onContinue,
}: Props) => {
  return (
    <ConfirmDialog
      group="declarative"
      visible={visible}
      header={title}
      message={description}
      accept={onContinue}
      reject={onCancel}
      onHide={onHide}
    />
  );
};

export default Alert;
