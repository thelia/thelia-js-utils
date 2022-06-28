import { ChangeEvent, FocusEvent, InputHTMLAttributes, ReactNode } from "react";

const Icon = ({ icon, className }: { icon: ReactNode; className?: string }) => {
  return (
    <span
      className={`absolute py-1 px-5 w-8 h-full leading-snug rounded text-base font-normal text-center flex items-center justify-center ${className}`}
    >
      {icon}
    </span>
  );
};

const Input = ({
  value,
  onChange,
  className,
  placeholder,
  icon,
  iconAlignment = "right",
  isValid,
  label,
  name,
  ...props
}: {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  icon?: ReactNode;
  iconAlignment?: "left" | "right";
  isValid?: boolean;
  label?: string;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      {label && <label>{label}</label>}
      <div className="relative w-full flex flex-wrap items-stretch">
        <input
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
          <Icon
            className={iconAlignment === "right" ? "right-0" : "left-0"}
            icon={icon}
          />
        )}

        {icon && isValid && iconAlignment === "left" && (
          <Icon
            className="right-0"
            icon={<i className="fas fa-check text-greenDark"></i>}
          />
        )}
      </div>
    </>
  );
};

export default Input;
