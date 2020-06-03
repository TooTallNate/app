import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ListBoxProps {
  className?: string;
  value?: any[];
  displayValue?(item: any): string;
  elementKey?(item: any): any;
  onChange?(value: any[]): void;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

const ListBox = forwardRef<HTMLUListElement, ListBoxProps>(function ListBox(
  {
    className,
    value = [],
    displayValue = item => item,
    elementKey = item => item,
    onChange,
    ...props
  },
  ref
) {
  return (
    <ul
      className={`
        rounded-lg border border-gray-500 overflow-x-auto
        ${className || ""}
      `}
      ref={ref}
      {...props}
    >
      {value.map((item, i) => (
        <li className="h-11 pl-4 flex items-center" key={i}>
          <span className="flex-grow">{displayValue(item)}</span>
          <button
            type="button"
            className="px-4 w-11 h-full rounded-lg focus:outline-none focus:shadow-outline"
            aria-label={`Remove ${displayValue(item)}`}
            onClick={() => {
              const newValue = value.slice();
              newValue.splice(i, 1);
              onChange && onChange(newValue);
            }}
          >
            <FontAwesomeIcon icon="times" />
          </button>
        </li>
      ))}
    </ul>
  );
});

export default ListBox;
