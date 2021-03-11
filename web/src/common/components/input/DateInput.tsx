import React, { ComponentProps } from "react";
import { dateInputDate, formInputDate } from "../../../common/utils";
import { useField } from "../form/FormField";

interface DateInputProps
  extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  value?: string;
  separator?: string;
  onChange?(value: string): void;
}

const formattedDate = (d: string, separator: string) => {
  if (!separator) return d;
  return formInputDate(d) || dateInputDate(new Date());
};

const unFormattedDate = (d: string, separator: string): string => {
  const [mm, dd, yyyy] = d.split(separator || "-");
  if (d && mm && dd && yyyy) return separator ? `${yyyy}-${mm}-${dd}` : d;
  else return dateInputDate(new Date());
};

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput({ className, onChange, value, separator, ...props }, ref) {
    const fieldConfig = useField();

    const labelId =
      props["aria-labelledby"] || (fieldConfig && fieldConfig.labelId);
    const name = props.name || (fieldConfig && fieldConfig.name);

    return (
      <input
        type="date"
        {...props}
        aria-labelledby={labelId}
        name={name}
        value={unFormattedDate(value || "", separator || "")}
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
          onChange &&
          onChange(
            formattedDate(e.target.value, separator || "") ||
              dateInputDate(new Date())
          )
        }
        ref={ref}
      />
    );
  }
);

export default DateInput;
