/** @jsx jsx */
import { jsx } from "@emotion/core";

interface FormLabelProps
  extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const FormLabel: React.FC<FormLabelProps> = ({ children, ...props }) => {
  return (
    <label
      {...props}
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
};

export default FormLabel;
