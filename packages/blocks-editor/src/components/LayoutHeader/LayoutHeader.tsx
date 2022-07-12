import { ReactNode } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-chevron.svg";
import { ReactComponent as OpenIcon } from "../../../assets/svg/open-chevron.svg";

import "./LayoutHeader.css";

const LayoutHeader = ({
  title,
  icon,
  open,
  setOpen,
}: {
  title: string;
  icon?: ReactNode;
  open: boolean;
  setOpen: Function;
}) => {
  return (
    <div className={`LayoutHeader ${!open ? "LayoutHeader--closed" : ""}`}>
      <div className="LayoutHeader__Infos">
        {icon}
        <span className="LayoutHeader__Title">{title}</span>
      </div>
      <button onClick={() => setOpen(!open)} className="LayoutHeader__Collapse">
        <div className="LayoutHeader__Collapse__Icon">
          {open ? <CloseIcon /> : <OpenIcon />}
        </div>
        <div className="LayoutHeader__Collapse__Label">
          {open ? "Replier" : "Déplier"}
        </div>
      </button>
    </div>
  );
};

export default LayoutHeader;
