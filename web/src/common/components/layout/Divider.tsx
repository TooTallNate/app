import React from "react";

type DividerProps = {
  className?: string;
  centerText?: string;
};

const Divider = (props: DividerProps) => (
  <div className={`relative ${props.className}`}>
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-300" />
    </div>
    {props.centerText && (
      <div className="relative flex justify-center">
        <span className="px-3 bg-white text-lg font-medium text-gray-900">
          {props.centerText}
        </span>
      </div>
    )}
  </div>
);

export default Divider;
