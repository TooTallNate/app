/** @jsx jsx */
import { jsx } from "@emotion/core";

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
  id?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange = () => {},
  ...props
}) => {
  return (
    <input
      {...props}
      value={value}
      onChange={e => onChange(parseFloat(e.target.value))}
      type="number"
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

export default NumberInput;
