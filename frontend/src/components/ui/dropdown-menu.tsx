import { OverlayPanel } from "primereact/overlaypanel";
import { ReactNode, RefObject, useRef } from "react";

type Props = {
  trigger: ReactNode;
  content: ReactNode;
  op: RefObject<null | OverlayPanel>;
};

const DropdownMenu = ({ op, content, trigger }: Props) => {
  return (
    <>
      {trigger}
      <OverlayPanel ref={op}>{content}</OverlayPanel>
    </>
  );
};

export default DropdownMenu;
