import { orderBy } from "lodash";
import React from "react";
import TableData from "../../common/components/layout/Table/TableData";
import TableHeader from "../../common/components/layout/Table/TableHeader";
import { MaintenanceHistoryAsset } from "../graphql";

interface MainenanceHistoryProps {
  maintenanceHistoryAsset: MaintenanceHistoryAsset[] | undefined;
}

const MainentanceHistoryView = React.forwardRef<
  HTMLElement,
  MainenanceHistoryProps
>(function MainentanceHistoryView({ maintenanceHistoryAsset }, ref) {
  if (!maintenanceHistoryAsset || !maintenanceHistoryAsset[0]) {
    return <h1>No data found.</h1>;
  }

  const sortedList = orderBy(maintenanceHistoryAsset, ["entry"], ["desc"]);

  return (
    <div className="overflow-x-scroll">
      <table className="divide-y divide-gray-200">
        <thead>
          <tr>
            <TableHeader children="Date" />
            <TableHeader children="Amount" />
            <TableHeader children="Code" />
            <TableHeader children="Comments" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedList.map(asset => (
            <tr key={asset.postingDate}>
              <TableData children={asset.postingDate} />
              <TableData children={`$${asset.amount}`} />
              <TableData children={asset.maintenanceCode} />
              <TableData children={asset.description} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default MainentanceHistoryView;
