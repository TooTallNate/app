import React from "react";
import { LinkProps, Link } from "react-router-dom";

const StackedNavLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <Link
        innerRef={ref}
        {...props}
        className={`
          flex items-center px-4 h-11
          text-base font-medium text-black no-underline
          border-b border-gray-500
          focus:outline-none focus:bg-blue-300
          last:border-b-0
          ${className}
        `}
      />
    );
  }
);

export default StackedNavLink;
