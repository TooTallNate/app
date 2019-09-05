/** @jsx jsx */
import { jsx } from "@emotion/core";

interface TextInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
  return (
    <input
      {...props}
      css={{
        fontSize: "1rem",
        padding: "12px",
        border: "1px solid #9ca1b1",
        borderRadius: 8,
        display: "block",
        width: "100%",
        boxSizing: "border-box"
      }}
    />
  );
};

export default TextInput;
