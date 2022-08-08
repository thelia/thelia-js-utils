import { ReactNode } from "react";
import { useIntl } from "react-intl";
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
  const intl = useIntl();

  return (
    <div className={`LayoutHeader ${!open ? "LayoutHeader--closed" : ""}`}>
      <div className="LayoutHeader__Infos">
        {icon}
        <span className="LayoutHeader__Title">{title}</span>
      </div>
      <button onClick={() => setOpen(!open)} className="LayoutHeader__Collapse">
        <div className="LayoutHeader__Collapse__Icon">
          {open ? (
            <CloseIcon style={{ display: "block" }} />
          ) : (
            <OpenIcon style={{ display: "block" }} />
          )}
        </div>
        <div className="LayoutHeader__Collapse__Label">
          {open
            ? intl.formatMessage({ id: "FOLD" })
            : intl.formatMessage({ id: "UNFOLD" })}
        </div>
      </button>
    </div>
  );
};

export default LayoutHeader;
