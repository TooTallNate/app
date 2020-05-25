import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ListBoxProps {
  value?: any[];
  displayValue?(item: any): string;
  elementKey?(item: any): any;
  onChange?(value: any[]): void;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

const ListBox = forwardRef<HTMLUListElement, ListBoxProps>(function ListBox(
  {
    value = [],
    displayValue = item => item,
    elementKey = item => item,
    onChange,
    ...props
  },
  ref
) {
  return (
    <ul className="rounded-lg border border-gray-500" ref={ref} {...props}>
      {value.map((item, i) => (
        <li className="h-11 pl-4 flex items-center" key={i}>
          <span className="flex-grow">{displayValue(item)}</span>
          <button
            type="button"
            className="px-4 w-11 h-full focus:outline-none"
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
