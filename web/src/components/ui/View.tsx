import React from "react";

const View = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={`
          flex flex-col h-full
          ${className}
        `}
      />
    );
  }
);

export default View;
