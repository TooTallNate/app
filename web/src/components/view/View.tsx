import React from "react";

const View: React.FC = ({ children }) => {
  return <div className="min-h-0 flex-1 flex flex-col h-full">{children}</div>;
};

export default View;
