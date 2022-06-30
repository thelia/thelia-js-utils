import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import InputWrapper from "./InputWrapper";

const InputIcon = ({ icon, className }: { icon: ReactNode; className?: string }) => {
  return (
    <span
      className={`absolute py-1 px-5 w-8 h-full leading-snug rounded text-base font-normal text-center flex items-center justify-center ${className}`}
    >
      {icon}
    </span>
  );
};

const Input = forwardRef(
  (
    {
      value,
      onChange,
      className,
      placeholder,
      icon,
      iconAlignment = "right",
      type = "text",
      isValid,
      label,
      name,
      info,
      error,
      ...props
    }: {
      value: string;
      onChange: (event: ChangeEvent<HTMLInputElement>) => void;
      onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
      className?: string;
      placeholder?: string;
      icon?: ReactNode;
      iconAlignment?: "left" | "right";
      type?: "text" | "password" | "email";
      isValid?: boolean;
      label?: string;
      name: string;
      info?: ReactNode;
      error?: string;
    } & InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <InputWrapper label={label} error={error} info={info}>
        <div className="relative w-full flex flex-wrap items-stretch">
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            className={`relative w-full rounded-md shadow border-mediumGrey outline-none ${
              iconAlignment === "left" && isValid
                ? "px-10"
                : iconAlignment === "left"
                ? "pl-10"
                : ""
            } ${className}`}
            placeholder={placeholder}
            {...props}
          />

          {icon && (
            <InputIcon
              className={iconAlignment === "right" ? "right-0" : "left-0"}
              icon={icon}
            />
          )}

          {icon && isValid && iconAlignment === "left" && (
            <InputIcon
              className="right-0"
              icon={<i className="fas fa-check text-greenDark"></i>}
            />
          )}
        </div>
      </InputWrapper>
    );
  }
);

export default Input;
