import { ChangeEvent, forwardRef, InputHTMLAttributes, ReactNode, Ref } from "react";
import InputWrapper from "./InputWrapper";

const Select = forwardRef(
  (
    {
      value,
      onChange,
      className,
      label,
      name,
      info,
      error,
      children,
      ...props
    }: {
      value: string;
      onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
      className?: string;
      label?: string;
      name: string;
      info?: ReactNode;
      error?: string;
      children: ReactNode;
    } & InputHTMLAttributes<HTMLSelectElement>,
    ref?: Ref<HTMLSelectElement>
  ) => {
    return (
      <InputWrapper label={label} error={error} info={info}>
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          className={`relative w-full rounded-md shadow border-mediumGrey outline-none ${className}`}
          {...props}
        >
          {children}
        </select>
      </InputWrapper>
    );
  }
);

export default Select;
