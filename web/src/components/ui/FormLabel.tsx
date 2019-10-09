/** @jsx jsx */
import { jsx } from "@emotion/core";
import { forwardRef } from "react";

interface FormLabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <label
        {...props}
        ref={ref}
        css={{
          fontSize: "1rem",
          fontWeight: "bold",
          boxSizing: "border-box",
          height: 44,
          lineHeight: "44px",
          display: "block"
        }}
      >
        {children}
      </label>
    );
  }
);

export default FormLabel;
