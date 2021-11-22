import { map, max, min, orderBy, reverse, slice } from "lodash";
import React from "react";
import { Line } from "react-chartjs-3";
import TableData from "../../common/components/layout/Table/TableData";
import TableHeader from "../../common/components/layout/Table/TableHeader";
import { FuelHistoryAsset } from "../../livestock-activity/graphql";
import { FuelAsset } from "../graphql";
import "chartjs-plugin-zoom";
import { ChartOptions } from "chart.js";

interface OptionsProps extends ChartOptions {
  wheel: any;
  pinch: any;
  pan: any;
  zoom: any;
}

interface FuelHistoryProps {
  fuelAsset: FuelAsset;
  fuelHistoryAsset: FuelHistoryAsset[];
}

const FuelHistoryView = React.forwardRef<HTMLElement, FuelHistoryProps>(
  function FuelHistoryView({ fuelHistoryAsset, fuelAsset }, ref) {
    const { unitOfMeasureCode } = fuelAsset;
    const sortedList = orderBy(fuelHistoryAsset, ["entry"], ["desc"]);
    const chartList = slice(sortedList, 0, -1);

    const calcRate = (asset: FuelHistoryAsset, i: number): number => {
      const { meta: m, quantity: q } = asset;
      if (!m || !q || i === sortedList.length - 1) return 0;
      return parseFloat(((m - sortedList[i + 1].meta) / q).toFixed(1));
    };

    const getUoM = (calc: number) => {
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
    const options: OptionsProps = {
      wheel: {
        speed: 1,
        enabled: true
      },
      pinch: {
        enabled: true
      },
      pan: {
        scale: 2,
        enabled: true,
        mode: "x"
      },
      zoom: {
        limits: {
          y: { min: min(chartList), max: max(chartList) }
        },
        enabled: true,
        mode: "x"
      }
    };

    return (
      <div className="pt-3 overflow-y-auto">
        <div className="overflow-x-scroll overflow-y-hidden pb-3">
          <Line
            options={options}
            legend={{ display: false }}
            data={{
              labels: reverse(map(chartList, x => x.postingDate)),
              datasets: [
                {
                  data: reverse(map(chartList, (x, i) => calcRate(x, i))),
                  fill: false,
                  borderColor: "black"
                }
              ]
            }}
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
