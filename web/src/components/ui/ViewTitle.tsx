import React from "react";

const ViewTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h1">
>(({ className, children, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      {...props}
      className={`
          py-4 flex-grow font-bold text-xl
          ${className}
        `}
    >
      {children}
    </h1>
  );
});

export default ViewTitle;
