import React, { ComponentProps } from "react";
import { useField } from "../form/FormField";

interface DateInputProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  value?: string;
  onChange?(value: string): void;
}

const formattedDate = (d: string) => {
  const [yyyy, mm, dd] = d.split("-");
  if (d && mm && dd && yyyy) return `${mm}/${dd}/${yyyy}`;
  else return "";
};

const unFormattedDate = (d: string) => {
  const [mm, dd, yyyy] = d.split("/");
  if (d && mm && dd && yyyy) return `${yyyy}-${mm}-${dd}`;
  else return "";
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(
    { className, onChange, value, autoComplete = "off", ...props },
    ref
  ) {
    const fieldConfig = useField();

    const labelId =
      props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
    const name = props.name || (fieldConfig && fieldConfig.name);

    return (
      <input
        type="date"
        {...props}
        autoComplete={autoComplete}
        aria-labelledby={labelId}
        name={name}
        value={unFormattedDate(value || "")}
        min=""
        max=""
        className={`
          flex items-center px-4 h-11 w-full no-spinner
          text-base text-black leading-none 
          border border-gray-500 rounded-lg
          focus:shadow-outline focus:outline-none
          ${className}
        `}
        onChange={e =>
          onChange && onChange(formattedDate(e.target.value || "") || "")
        }
        ref={ref}
      />
    );
  }
);

export default DateInput;
