import React from "react";

interface ViewHeaderProps {
  className?: string;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ className, children }) => {
  return (
    <header
      className={`flex items-center px-4 border-b border-gray-500 ${className}`}
    >
      {children}
    </header>
  );
};

export default ViewHeader;
