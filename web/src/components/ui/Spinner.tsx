/** @jsx jsx */
import { jsx, keyframes } from "@emotion/core";

interface SpinnerProps {
  className?: string;
  size?: number;
  color?: string;
}

const spinner = keyframes({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});

const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = 56,
  color = "black"
}) => {
  const width = `${Math.floor(size / 7)}px`;
  return (
    <div
      className={className}
      css={{
        display: "inline-block",
        width: size,
        height: size,
        "::after": {
          content: "' '",
          boxSizing: "border-box",
          display: "block",
          width: size,
          height: size,
          borderRadius: "50%",
          border: `${width} solid`,
          borderColor: `${color} transparent ${color} transparent`,
          animation: `${spinner} 1.2s linear infinite`
        }
      }}
      aria-hidden
    />
  );
};

export default Spinner;
