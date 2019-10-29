/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";

interface SpinnerProps {
  className?: string;
}

const spinner = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div
      className={className}
      css={{
        display: "inline-block",
        width: 56,
        height: 56,
        "::after": {
          content: "' '",
          boxSizing: "border-box",
          display: "block",
          width: 56,
          height: 56,
          margin: 1,
          borderRadius: "50%",
          border: `5px solid black`,
          borderColor: "black transparent black transparent",
          animation: `${spinner} 1.2s linear infinite`
        }
      }}
      aria-hidden
    />
  );
};

export default Spinner;
