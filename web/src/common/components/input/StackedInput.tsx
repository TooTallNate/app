import React, {
  useContext,
  createContext,
  useImperativeHandle,
  useRef,
  forwardRef
} from "react";

export type StackedButtonOrientation = "vertical" | "horizontal";

interface StackedInputContextValue {
  orientation: StackedButtonOrientation;
  name: string;
  onChange?(value: any): void;
  selected: any;
}

const StackedInputContext = createContext<StackedInputContextValue>({
  orientation: "horizontal",
  name: "stacked-button",
  selected: null
});

export function useStackedInputContext(): StackedInputContextValue {
  const context = useContext(StackedInputContext);
  if (!context) {
    throw new Error(
      "useStackedInputContext must be in a child component of StackedInput."
    );
  }
  return context;
}

interface StackedButtonInputProps {
  orientation: StackedButtonOrientation;
  className?: string;
  name?: string;
  value?: any;
  children?: React.ReactNode;
  onChange?(value: any): void;
  "aria-labelledby"?: string;
}

interface StackedButtonInputRef {
  focus(): void;
}

const StackedInput = forwardRef<StackedButtonInputRef, StackedButtonInputProps>(
  function StackedInput(
    {
      className,
      orientation,
      children,
      name = "stacked-button",
      onChange,
      value,
      ...props
    },
    ref
  ) {
    const firstElement = useRef<HTMLInputElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        focus() {
          const input = firstElement.current;
          if (input && input.focus) {
            input.focus();
          }
        }
      }),
      []
    );

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
        <StackedInputContext.Provider
          value={{
            orientation,
            name,
            onChange,
            selected: value
          }}
        >
          {React.Children.map(children, (child, i) => {
            if (i === 0 && React.isValidElement(child)) {
              return React.cloneElement(child, {
                ref: (value: any) => {
                  (firstElement.current as any) = value;
                }
              });
            } else {
              return child;
            }
          })}
        </StackedInputContext.Provider>
      </div>
    );
  }
);

export default StackedInput;
