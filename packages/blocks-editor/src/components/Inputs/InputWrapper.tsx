import Tippy from "@tippyjs/react";
import { ReactNode } from "react";

const InputWrapper = ({
  children,
  label,
  error,
  info,
}: {
  children: ReactNode;
  label?: string;
  error?: string;
  info?: ReactNode;
}) => {
  return (
    <div className="Input-Wrapper">
      <div className="flex justify-between">
        {label && <label>{label}</label>}
        {info && (
          <Tippy delay={[700, 0]} content={info}>
            <i className="fa fa-info-circle cursor-help"></i>
          </Tippy>
        )}
      </div>
      {children}
      {error && <div className="text-error mt-1 text-sm">{error}</div>}
    </div>
  );
};

export default InputWrapper;
