import { ChartOptions } from "chart.js";
import "chartjs-plugin-zoom";
import { map, max, min, orderBy, reverse, slice } from "lodash";
import React from "react";
import { Line } from "react-chartjs-3";
import { FuelHistoryAsset } from "../../livestock-activity/graphql";

interface OptionsProps extends ChartOptions {
  wheel: any;
  pinch: any;
  pan: any;
  zoom: any;
}

interface FuelHistoryChartProps {
  unitOfMeasureCode: string;
  fuelHistoryAsset: FuelHistoryAsset[];
  calcRate: Function;
}

const FuelHistoryChart = React.forwardRef<HTMLElement, FuelHistoryChartProps>(
  function FuelHistoryView({ fuelHistoryAsset, calcRate }, ref) {
    const sortedList = orderBy(fuelHistoryAsset, ["entry"], ["desc"]);
    const chartList = slice(sortedList, 0, -1);

    if (!fuelHistoryAsset || !fuelHistoryAsset[0]) {
      return <h1>No data found.</h1>;
    }

    const calcChartData = {
      labels: reverse(map(chartList, x => x.postingDate)),
      data: reverse(map(chartList, (x, i) => calcRate(x, i)))
    };

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
          y: { min: min(calcChartData.data), max: max(calcChartData.data) }
        },
        enabled: true,
        mode: "x"
      }
    };

    return (
      <Line
        options={options}
        legend={{ display: false }}
        data={{
          labels: calcChartData.labels,
          datasets: [
            {
              data: calcChartData.data,
              fill: false,
              borderColor: "black"
            }
          ]
        }}
      />
    );
  }
);

export default FuelHistoryChart;
