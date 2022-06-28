import { ReactNode } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/svg/close-chevron.svg";
import { ReactComponent as OpenIcon } from "../../../assets/svg/open-chevron.svg";

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
    <div
      className={`p-4 lg:pl-11 md:pr-5 xl:pl-12 bg-mediumCharbon text-white rounded-tr-md ${
        !open && "rounded-br-md"
      } flex justify-between items-center`}
    >
      <div className="flex items-center gap-3 xl:gap-7">
        {icon}
        <span className="text-base font-extrabold">{title}</span>
      </div>
      <button onClick={() => setOpen(!open)} className="flex items-stretch">
        <div className="bg-lightVermillon p-2 rounded-l-md">
          {open ? <CloseIcon /> : <OpenIcon />}
        </div>
        <div className="bg-vermillon font-semibold text-xs uppercase tracking-wider rounded-r-md py-2 px-2">
          {open ? "Replier" : "Déplier"}
        </div>
      </button>
    </div>
  );
};

export default LayoutHeader;
