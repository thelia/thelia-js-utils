import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, Ref } from "react";
import InputWrapper from "./InputWrapper";

const Select = forwardRef(
  (
    {
      value,
      onChange,
      className,
      label,
      id,
      info,
      error,
      children,
      ...props
    }: {
      value: string;
      onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
      className?: string;
      label?: string;
      id: string;
      info?: ReactNode;
      error?: string;
      children: ReactNode;
    } & InputHTMLAttributes<HTMLSelectElement>,
    ref?: Ref<HTMLSelectElement>
  ) => {
    return (
      <InputWrapper id={id} label={label} error={error} info={info}>
        <select
          id={id}
          ref={ref}
          value={value}
          onChange={onChange}
          className="Input__Select"
          {...props}
        >
          {children}
        </select>
      </InputWrapper>
    );
  }
);

export default Select;
