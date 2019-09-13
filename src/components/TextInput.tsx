/** @jsx jsx */
import { jsx } from "@emotion/core";

interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  type?: string;
  id?: string;
  className?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange = () => {},
  ...props
}) => {
  return (
    <input
      {...props}
      value={value}
      onChange={e => onChange(e.target.value)}
      css={{
        fontSize: "1rem",
        padding: "12px",
        border: "1px solid #9ca1b1",
        borderRadius: 8,
        display: "block",
        width: "100%",
        boxSizing: "border-box",
        "&:focus": {
          boxShadow: "0 0 0 1px #9ca1b1",
          outline: "none"
        }
      }}
    />
  );
};

export default TextInput;
