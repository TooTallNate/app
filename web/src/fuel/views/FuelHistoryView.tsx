import { map, max, min, orderBy, reverse, slice } from "lodash";
import React from "react";
import { Line } from "react-chartjs-3";
import TableData from "../../common/components/layout/Table/TableData";
import TableHeader from "../../common/components/layout/Table/TableHeader";
import { FuelHistoryAsset } from "../../livestock-activity/graphql";
import { FuelAsset } from "../graphql";
import "chartjs-plugin-zoom";

interface FuelHistoryProps {
  fuelAsset: FuelAsset;
  fuelHistoryAsset: FuelHistoryAsset[];
}

const DATAAAA: FuelHistoryAsset[] = [
  {
    postingDate: "2021-06-30",
    quantity: 20,
    meta: 182360,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-07-14",
    quantity: 18,
    meta: 182562,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-07-27",
    quantity: 20,
    meta: 182783,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-08-07",
    quantity: 21,
    meta: 183000,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-08-17",
    quantity: 19,
    meta: 183208,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-08-26",
    quantity: 18,
    meta: 183410,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-08-27",
    quantity: 18,
    meta: 183636,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-08-28",
    quantity: 21,
    meta: 183850,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-08-29",
    quantity: 20,
    meta: 184052,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-08-30",
    quantity: 19,
    meta: 184256,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-01",
    quantity: 19,
    meta: 184459,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-02",
    quantity: 21,
    meta: 184684,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-03",
    quantity: 21,
    meta: 184889,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-04",
    quantity: 18,
    meta: 185095,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-05",
    quantity: 18,
    meta: 185300,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-06",
    quantity: 18,
    meta: 185517,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-07",
    quantity: 18,
    meta: 185736,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-08",
    quantity: 18,
    meta: 185947,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-09",
    quantity: 18,
    meta: 186156,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-10",
    quantity: 20,
    meta: 186365,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-11",
    quantity: 20,
    meta: 186593,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-12",
    quantity: 18,
    meta: 186803,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-13",
    quantity: 20,
    meta: 187003,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-14",
    quantity: 21,
    meta: 187217,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-15",
    quantity: 21,
    meta: 187429,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-16",
    quantity: 19,
    meta: 187647,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-17",
    quantity: 18,
    meta: 187869,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-18",
    quantity: 20,
    meta: 188080,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-19",
    quantity: 20,
    meta: 188287,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-20",
    quantity: 21,
    meta: 188500,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-21",
    quantity: 19,
    meta: 188726,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-22",
    quantity: 19,
    meta: 188946,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-23",
    quantity: 21,
    meta: 189171,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-24",
    quantity: 19,
    meta: 189379,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-25",
    quantity: 18,
    meta: 189588,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-26",
    quantity: 19,
    meta: 189802,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-27",
    quantity: 20,
    meta: 190003,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-28",
    quantity: 20,
    meta: 190219,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-09-29",
    quantity: 18,
    meta: 190446,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-01",
    quantity: 21,
    meta: 190662,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-02",
    quantity: 21,
    meta: 190890,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-03",
    quantity: 18,
    meta: 191098,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-04",
    quantity: 21,
    meta: 191315,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-05",
    quantity: 19,
    meta: 191521,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-06",
    quantity: 21,
    meta: 191741,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-07",
    quantity: 18,
    meta: 191964,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-08",
    quantity: 18,
    meta: 192183,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-09",
    quantity: 18,
    meta: 192408,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-10",
    quantity: 18,
    meta: 192630,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-11",
    quantity: 21,
    meta: 192838,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-12",
    quantity: 21,
    meta: 193055,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-13",
    quantity: 19,
    meta: 193260,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-14",
    quantity: 19,
    meta: 193469,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-15",
    quantity: 18,
    meta: 193692,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-16",
    quantity: 18,
    meta: 193917,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-17",
    quantity: 18,
    meta: 194147,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-18",
    quantity: 18,
    meta: 194377,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-19",
    quantity: 19,
    meta: 194599,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-20",
    quantity: 20,
    meta: 194816,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-21",
    quantity: 19,
    meta: 195037,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-22",
    quantity: 18,
    meta: 195240,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-23",
    quantity: 18,
    meta: 195467,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-24",
    quantity: 19,
    meta: 195680,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-25",
    quantity: 20,
    meta: 195902,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-26",
    quantity: 18,
    meta: 196103,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-27",
    quantity: 20,
    meta: 196328,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-28",
    quantity: 20,
    meta: 196556,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-10-29",
    quantity: 18,
    meta: 196783,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-01",
    quantity: 20,
    meta: 196998,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-02",
    quantity: 20,
    meta: 197208,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-03",
    quantity: 19,
    meta: 197433,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-04",
    quantity: 18,
    meta: 197633,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-05",
    quantity: 20,
    meta: 197863,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-06",
    quantity: 20,
    meta: 198085,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-07",
    quantity: 19,
    meta: 198303,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-08",
    quantity: 20,
    meta: 198518,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-09",
    quantity: 20,
    meta: 198744,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-10",
    quantity: 18,
    meta: 198965,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-11",
    quantity: 20,
    meta: 199170,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-12",
    quantity: 19,
    meta: 199395,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-13",
    quantity: 19,
    meta: 199619,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-14",
    quantity: 19,
    meta: 199830,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-15",
    quantity: 20,
    meta: 200055,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-16",
    quantity: 18,
    meta: 200284,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-17",
    quantity: 18,
    meta: 200489,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-18",
    quantity: 18,
    meta: 200707,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-19",
    quantity: 20,
    meta: 200920,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-20",
    quantity: 21,
    meta: 201147,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-21",
    quantity: 19,
    meta: 201365,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-22",
    quantity: 18,
    meta: 201577,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-23",
    quantity: 20,
    meta: 201795,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-24",
    quantity: 21,
    meta: 202016,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-25",
    quantity: 20,
    meta: 202216,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-26",
    quantity: 20,
    meta: 202440,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-27",
    quantity: 18,
    meta: 202642,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-28",
    quantity: 20,
    meta: 202871,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  },
  {
    postingDate: "2021-11-29",
    quantity: 21,
    meta: 203074,
    entry: 0,
    number: "0",
    amount: 0,
    maintenanceCode: "",
    reasonCode: "",
    description: ""
  }
];

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
    const options = {
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
          // y: { min: min(chartList), max: max(chartList) }
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
              // labels: LABELLLL,
              datasets: [
                {
                  data: reverse(map(chartList, (x, i) => calcRate(x, i))),
                  // data: DATAAAAAAA,
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
