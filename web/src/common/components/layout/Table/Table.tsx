import React from "react";

const Table: React.FC = ({ children }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
};

export default Table;
