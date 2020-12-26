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
    <main className="relative h-full overflow-hidden">
      <div className="p-4 h-full overflow-x-hidden overflow-y-auto">
        {loading ? <FullPageSpinner /> : children}
      </div>
    </main>
  );
};

export default ViewContent;
