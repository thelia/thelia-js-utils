import { forwardRef, InputHTMLAttributes, ReactNode, Ref } from "react";
import InputWrapper from "./InputWrapper";

const TextArea = forwardRef(
  (
    {
      rows = 5,
      id,
      label,
      info,
      error,
      className,
      ...props
    }: {
      rows?: number;
      id: string;
      label?: string;
      info?: ReactNode;
      error?: string;
      className?: string;
    } & InputHTMLAttributes<HTMLTextAreaElement>,
    ref?: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <InputWrapper id={id} label={label} error={error} info={info}>
        <textarea className="Input__TextArea" ref={ref} rows={rows} id={id} {...props} />
      </InputWrapper>
    );
  }
);

export default TextArea;
