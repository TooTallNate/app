import React from "react";

const ViewHeader: React.FC = ({ children }) => {
  return (
    <header className="flex items-center px-4 border-b border-gray-500">
      {children}
    </header>
  );
};

export default ViewHeader;
