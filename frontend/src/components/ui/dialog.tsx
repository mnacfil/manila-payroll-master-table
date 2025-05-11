import { Dialog as PDialog } from "primereact/dialog";
import { ReactNode } from "react";

type Props = {
  visible: boolean;
  onHide: () => void;
  content: ReactNode;
};

const Dialog = ({ content, onHide, visible }: Props) => {
  return (
    <PDialog visible={visible} onHide={() => onHide()}>
      {content}
    </PDialog>
  );
};

export default Dialog;
