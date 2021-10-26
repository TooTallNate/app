import React from "react";
import TableData from "../../common/components/layout/Table/TableData";
import TableHeader from "../../common/components/layout/Table/TableHeader";
import { FuelHistoryAsset } from "../../livestock-activity/graphql";
import { FuelAsset } from "../graphql";
import { orderBy } from "lodash";

interface FuelHistoryProps {
  fuelAsset: FuelAsset;
  fuelHistoryAsset: FuelHistoryAsset[];
}

const FuelHistoryView = React.forwardRef<HTMLElement, FuelHistoryProps>(
  function FuelHistoryView({ fuelHistoryAsset, fuelAsset }, ref) {
    const { unitOfMeasureCode } = fuelAsset;
    const sortedList = orderBy(fuelHistoryAsset, ["entry"], ["desc"]);

    const calcRate = (asset: FuelHistoryAsset, index: number): string => {
      if (index === sortedList.length - 1) return "---";

      const calc = Math.round(
        (asset.meta - sortedList[index + 1].meta) / asset.quantity
      );

      switch (unitOfMeasureCode.toLowerCase()) {
        case "miles":
          return `${calc} mpg`;
        case "hours":
          return `${calc} fph`;
        default:
          return "---";
      }
    };

    if (!fuelAsset || !fuelHistoryAsset || !fuelHistoryAsset[0]) {
      return <h1>No data found.</h1>;
    }

    return (
      <div className="overflow-x-scroll pb-3">
        <table className="divide-y divide-gray-200 box-shadow">
          <thead>
            <tr>
              <TableHeader children="Date" />
              <TableHeader children="Amount" />
              <TableHeader children="Quantity" />
              <TableHeader children="Efficiency" />
              <TableHeader children="Odometer" />
              <TableHeader children="Delta" />
              <TableHeader children="Comments" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedList.map((asset: FuelHistoryAsset, index: number) => (
              <tr key={asset.postingDate}>
                <TableData children={asset.postingDate} />
                <TableData children={`$${asset.amount}`} />
                <TableData children={`${asset.quantity} gal`} />
                <TableData children={calcRate(asset, index)} />
                <TableData children={`${asset.meta}`} />
                <TableData
                  children={`${sortedList[index + 1] &&
                    asset.meta - sortedList[index + 1].meta}`}
                />
                <TableData children={`${asset.description}`} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

export default FuelHistoryView;
