import React, { useContext, createContext } from "react";

type StackedButtonOrientation = "vertical" | "horizontal";

interface StackedButtonContextValue {
  orientation: StackedButtonOrientation;
  name: string;
  onChange?(value: any): void;
  selected: any;
}

interface StackedButtonProps {
  value: any;
  children?: React.ReactNode;
}

interface StackedButtonInputProps {
  orientation: StackedButtonOrientation;
  className?: string;
  name?: string;
  value?: any;
  onChange?(value: any): void;
  "aria-labelledby"?: string;
}

const StackedButtonContext = createContext<StackedButtonContextValue>({
  orientation: "horizontal",
  name: "stacked-button",
  selected: null
});

export const StackedButton: React.FC<StackedButtonProps> = ({
  value,
  children
}) => {
  const context = useContext(StackedButtonContext);

  if (!context) {
    throw new Error();
  }
  const { orientation, selected, onChange, name } = context;

  return (
    <label
      className={`
        h-11 text-base font-bold border-gray-500
        focus:outline-none focus:bg-blue-300
        ${
          orientation === "vertical"
            ? "border-b last:border-b-0"
            : "flex-1 text-center border-r last:border-r-0"
        }
      `}
    >
      <input
        className="absolute opacity-0"
        type="radio"
        value={value}
        name={name}
        checked={selected === value}
        onChange={e => onChange && onChange(e.target.value)}
      />
      <div className="flex items-center h-full px-4 checked:bg-blue-300">
        {children}
      </div>
    </label>
  );
};

const StackedButtonInput: React.FC<StackedButtonInputProps> = ({
  className,
  orientation,
  children,
  name = "stacked-button",
  onChange,
  value,
  ...props
}) => {
  return (
    <div
      aria-labelledby={props["aria-labelledby"]}
      role="group"
      className={`
        flex rounded-lg border border-gray-500 overflow-hidden
        focus-within:shadow-outline
        ${orientation === "vertical" ? "flex-col" : ""}
        ${className}
      `}
    >
      <StackedButtonContext.Provider
        value={{
          orientation,
          name,
          onChange,
          selected: value
        }}
      >
        {children}
      </StackedButtonContext.Provider>
    </div>
  );
};

export default StackedButtonInput;
