import React from "react";
import FullPageSpinner from "../FullPageSpinner";

export interface ViewContentProps {
  loading?: boolean;
}

const ViewContent: React.FC<ViewContentProps> = ({
  children,
  loading = false
}) => {
  return (
    <main className="relative flex flex-col h-full p-4 overflow-x-hidden overflow-y-auto">
      {loading ? <FullPageSpinner /> : children}
    </main>
  );
};

export default ViewContent;
