import React from "react";
import Spinner from "./ui/Spinner";

const FullPageSpinner: React.FC = ({ children }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Spinner />
      <div
        css={{
          margin: 32,
          fontWeight: "bold"
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FullPageSpinner;
