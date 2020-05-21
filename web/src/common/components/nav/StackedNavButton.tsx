import React from "react";

const StackedNavButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
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
});

export default StackedNavButton;
