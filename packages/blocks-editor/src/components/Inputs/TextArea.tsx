import { forwardRef, InputHTMLAttributes, ReactNode, Ref } from "react";
import InputWrapper from "./InputWrapper";

const TextArea = forwardRef(
  (
    {
      rows = 5,
      label,
      info,
      error,
      ...props
    }: {
      rows?: number;
      label?: string;
      info?: ReactNode;
      error?: string;
    } & InputHTMLAttributes<HTMLTextAreaElement>,
    ref?: Ref<HTMLTextAreaElement>
  ) => {
    return (
      <InputWrapper label={label} error={error} info={info}>
        <textarea ref={ref} rows={rows} {...props} />
      </InputWrapper>
    );
  }
);

export default TextArea;
