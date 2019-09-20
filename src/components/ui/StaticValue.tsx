/** @jsx jsx */
import { jsx } from "@emotion/core";

interface NumberInputProps {
  className?: string;
  id?: string;
}

const StaticValue: React.FC<NumberInputProps> = props => {
  return (
    <output
      {...props}
      css={{
        fontSize: "1rem",
        padding: "13px",
        display: "block",
        width: "100%",
        boxSizing: "border-box"
      }}
    />
  );
};

export default StaticValue;
