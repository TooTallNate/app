import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, type = "button", ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      type={type}
      className={`
        px-4 h-11 block
        text-base font-bold text-white leading-none 
        bg-black border border-black rounded-lg
        active:border-gray-500 active:text-black active:bg-white
        focus:shadow-outline focus:outline-none
        ${className}
      `}
    />
  );
});

export default Button;
