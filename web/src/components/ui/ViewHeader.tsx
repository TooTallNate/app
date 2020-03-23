import React from "react";

const ViewHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`
          flex items-center px-4
          ${className}
        `}
    />
  );
});

export default ViewHeader;
