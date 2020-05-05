import React from "react";

export interface ViewTitleProps {
  className?: string;
}

const ViewTitle: React.FC<ViewTitleProps> = ({ className, children }) => {
  return (
    <h1 className={`py-4 flex-grow font-bold text-xl ${className || ""}`}>
      {children}
    </h1>
  );
};

export default ViewTitle;
