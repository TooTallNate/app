import "chartjs-plugin-zoom";
import { orderBy } from "lodash";
import React from "react";
import TableData from "../../common/components/layout/Table/TableData";
import TableHeader from "../../common/components/layout/Table/TableHeader";
import { FuelHistoryAsset } from "../../livestock-activity/graphql";
import { FuelAsset } from "../graphql";
import FuelHistoryChart from "./FuelHistoryChart";

interface FuelHistoryProps {
  fuelAsset: FuelAsset;
  fuelHistoryAsset: FuelHistoryAsset[];
}

const FuelHistoryView = React.forwardRef<HTMLElement, FuelHistoryProps>(
  function FuelHistoryView({ fuelHistoryAsset, fuelAsset }, ref) {
    const { unitOfMeasureCode } = fuelAsset;

    const sortedList = orderBy(fuelHistoryAsset, ["entry"], ["desc"]);

    const calcRate = (asset: FuelHistoryAsset, i: number): number => {
      const { meta: m, quantity: q } = asset;
      if (!m || !q || i === sortedList.length - 1) return 0;
      if (unitOfMeasureCode === "HOUR") {
        return parseFloat((q / (m - sortedList[i + 1].meta)).toFixed(1));
      } else {
        return parseFloat(((m - sortedList[i + 1].meta) / q).toFixed(1));
      }
    };

    const getUoM = (calc: number) => {
      switch (unitOfMeasureCode.toUpperCase()) {
        case "MILES":
        case "MILE":
          return `${calc} mpg`;
        case "HOURS":
        case "HOUR":
          return `${calc} gph`;
        default:
          return "---";
      }
    };

    if (!fuelAsset || !fuelHistoryAsset || !fuelHistoryAsset[0]) {
      return <h1>No data found.</h1>;
    }

    return (
      <div className="pt-3 overflow-y-auto">
        <div className="overflow-x-scroll overflow-y-hidden pb-3">
          <FuelHistoryChart
            unitOfMeasureCode={fuelAsset.unitOfMeasureCode}
            fuelHistoryAsset={fuelHistoryAsset}
            calcRate={calcRate}
          />
        </div>
        <div className="overflow-x-auto pb-3">
          <table className="divide-y divide-gray-200 box-shadow min-w-full">
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
                  <TableData children={getUoM(calcRate(asset, index))} />
                  <TableData children={`${asset.meta}`} />
                  <TableData
                    children={`${
                      sortedList[index + 1]
                        ? asset.meta - sortedList[index + 1].meta
                        : "---"
                    }`}
                  />
                  <TableData children={`${asset.description}`} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

export default FuelHistoryView;
