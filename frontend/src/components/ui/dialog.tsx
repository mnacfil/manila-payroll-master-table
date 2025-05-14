import { DialogProps, Dialog as PDialog } from "primereact/dialog";

type Props = {} & DialogProps;

const Dialog = (props: Props) => {
  return <PDialog {...props} />;
};

export default Dialog;
