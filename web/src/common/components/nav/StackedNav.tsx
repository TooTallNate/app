import React from "react";

const StackedNav = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(
  ({ className, role = "navigation", ...props }, ref) => {
    return (
      <nav
        ref={ref}
        {...props}
        role={role}
        className={`
          flex flex-col rounded-lg border border-gray-500 overflow-hidden
          focus-within:shadow-outline focus-within:outline-none
          ${className}
        `}
      />
    );
  }
);

export default StackedNav;
