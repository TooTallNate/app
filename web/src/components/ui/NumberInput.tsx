import React from "react";
import { TextInput } from "../styled";

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
    <TextInput
      {...props}
      value={value || ""}
      onChange={e => onChange(parseFloat(e.target.value))}
      type="number"
    />
  );
};

export default NumberInput;
