import React from "react";

const TableData: React.FC = ({ children }) => {
  return (
    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
      {children}
    </td>
  );
};

export default TableData;
