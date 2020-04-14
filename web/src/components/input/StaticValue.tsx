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
          flex items-center px-4 h-11 w-full text-base relative
          focus:outline-none focus:shadow-outline-b
          ${className}
        `}
        ref={ref}
      />
    );
  }
);

export default StaticValue;
