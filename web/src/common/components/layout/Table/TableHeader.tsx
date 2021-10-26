import React from "react";

const TableHeader: React.FC = ({ children }) => {
  return (
    <th
      scope="col"
      className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
    >
      {children}
    </th>
  );
};

export default TableHeader;
