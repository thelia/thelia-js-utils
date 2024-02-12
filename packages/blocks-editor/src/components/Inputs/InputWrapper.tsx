import Tippy from "@tippyjs/react";
import { ReactNode } from "react";
import { ReactComponent as InfoIcon } from "../../../assets/svg/info.svg";
import "./Inputs.css";

const InputWrapper = ({
  children,
  label,
  error,
  info,
  id,
  className,
}: {
  children: ReactNode;
  label?: string;
  error?: string;
  className?: string;
  info?: ReactNode;
  id: string;
}) => {
  return (
    <div className={`Input__Wrapper ${className}`}>
      <div className="Input__Wrapper__Header">
        {label && <label htmlFor={id}>{label}</label>}
        {info && (
          <Tippy delay={[700, 0]} content={info}>
            <div>
              <InfoIcon />
            </div>
          </Tippy>
        )}
      </div>
      {children}
      {error && <div className="Input__Wrapper__Error">{error}</div>}
    </div>
  );
};

export default InputWrapper;
