import Tippy from "@tippyjs/react";
import { ReactNode } from "react";

import "./Inputs.module.css";

const InputWrapper = ({
  children,
  label,
  error,
  info,
  id,
}: {
  children: ReactNode;
  label?: string;
  error?: string;
  info?: ReactNode;
  id: string;
}) => {
  return (
    <div className="Input__Wrapper">
      <div className="Input__Wrapper__Header">
        {label && <label htmlFor={id}>{label}</label>}
        {info && (
          <Tippy delay={[700, 0]} content={info}>
            <i className="fa fa-info-circle"></i>
          </Tippy>
        )}
      </div>
      {children}
      {error && <div className="Input__Wrapper__Error">{error}</div>}
    </div>
  );
};

export default InputWrapper;
