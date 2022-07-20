import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import InputWrapper from "./InputWrapper";

const InputIcon = ({
  icon,
  alignment = "left",
}: {
  icon: ReactNode;
  alignment?: "left" | "right";
}) => {
  return (
    <span
      className={`Input__Icon Input__Icon${alignment === "left" ? "--left" : "--right"}`}
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
      iconAlignment = "left",
      type = "text",
      isValid,
      label,
      id,
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
      id: string;
      info?: ReactNode;
      error?: string;
    } & InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <InputWrapper id={id} label={label} error={error} info={info}>
        <div className="Input__Text__Wrapper">
          <input
            ref={ref}
            type={type}
            value={value}
            id={id}
            onChange={onChange}
            className={`Input__Text ${
              iconAlignment === "left" && icon
                ? "Input__Text--withIcon"
                : icon && isValid
                ? "Input__Text--withIcons"
                : ""
            }`}
            placeholder={placeholder}
            {...props}
          />

          {icon && <InputIcon alignment={iconAlignment} icon={icon} />}

          {icon && isValid && iconAlignment === "left" && (
            <InputIcon
              alignment={iconAlignment}
              icon={<i className="fas fa-check"></i>}
            />
          )}
        </div>
      </InputWrapper>
    );
  }
);

export default Input;
