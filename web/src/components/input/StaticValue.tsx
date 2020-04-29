import React from "react";

interface StaticValueProps {
  value?: string | number;
  className?: string;
  name?: string;
  "aria-labelledby"?: string;
}

const StaticValue = React.forwardRef<HTMLInputElement, StaticValueProps>(
  function StaticValue({ className, ...props }, ref) {
    return (
      <input
        readOnly
        {...props}
        className={`
          flex items-center pl-3 pr-4 h-6 w-full text-base relative border-l-4 border-transparent
          focus:outline-none focus:border-blue-300
          ${className}
        `}
        ref={ref}
      />
    );
  }
);

export default StaticValue;
