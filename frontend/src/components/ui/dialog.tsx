import { DialogProps, Dialog as PDialog } from "primereact/dialog";
import { ReactNode } from "react";

type Props = { renderedContent: ReactNode; onClose: () => void } & DialogProps;

const Dialog = ({ renderedContent, onClose, ...props }: Props) => {
  return (
    <PDialog
      position="center"
      style={{ width: "50vw" }}
      content={
        <div className="bg-white rounded-lg p-6 w-full relative">
          {renderedContent}
          <i
            role="button"
            aria-label="close"
            className="pi pi-times absolute top-5 right-5 cursor-pointer"
            onClick={() => {
              if (!props.visible) return;
              onClose();
            }}
          ></i>
        </div>
      }
      {...props}
    />
  );
};

export default Dialog;
