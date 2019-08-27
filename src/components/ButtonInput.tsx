/** @jsx jsx */
import { jsx } from "@emotion/core";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const ButtonInput: React.FC<ButtonProps> = ({
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      {...{ type, ...props }}
      css={{
        fontSize: "1rem",
        padding: "12px",
        border: "1px solid #9ca1b1",
        borderRadius: 8,
        backgroundColor: "inherit"
      }}
    >
      {children}
    </button>
  );
};

export default ButtonInput;
