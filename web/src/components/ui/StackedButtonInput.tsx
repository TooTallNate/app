import React from "react";
import { useField } from "./Field";

interface StackedButtonProps {
  value: any;
  orientation?: string;
  className?: string;
  name?: string;
  children?: React.ReactNode;
}

export const StackedButton = React.forwardRef<
  HTMLInputElement,
  StackedButtonProps
>(function StackedButton(
  { className, value, name, orientation = "vertical", children },
  ref
) {
  return (
    <label
      className={`
        h-10 text-base font-bold border-gray-500
        focus:outline-none focus:bg-blue-300
        ${
          orientation === "vertical"
            ? "border-b last:border-b-0"
            : "flex-1 text-center border-r last:border-r-0"
        }
        ${className}
      `}
    >
      <input
        ref={ref}
        className="absolute opacity-0"
        type="radio"
        value={value}
        name={name}
      />
      <div className="py-2 px-4 checked:bg-blue-300">{children}</div>
    </label>
  );
});

interface StackedButtonInputProps {
  orientation: "vertical" | "horizontal";
  className?: string;
  name?: string;
  "aria-labelledby"?: string;
}

const StackedButtonInput: React.FC<StackedButtonInputProps> = ({
  className,
  orientation,
  children,
  ...props
}) => {
  const fieldConfig = useField();

  const labelId =
    props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
  const name = props.name || (fieldConfig && fieldConfig.name);
  const register = fieldConfig && fieldConfig.register;

  return (
    <div
      aria-labelledby={labelId}
      role="group"
      className={`
        flex rounded-lg border border-gray-500 overflow-hidden
        focus-within:shadow-outline
        ${orientation === "vertical" ? "flex-col" : ""}
        ${className}
      `}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              orientation,
              name,
              ref: register
            })
          : child
      )}
    </div>
  );
};

export default StackedButtonInput;
