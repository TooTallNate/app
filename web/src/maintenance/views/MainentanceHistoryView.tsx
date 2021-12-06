import { groupBy, map, orderBy, reverse, sumBy, takeRight } from "lodash";
import React, { useEffect, useState } from "react";
import { TypeaheadItem } from "../../common/components/input/TypeaheadInput";
import TableData from "../../common/components/layout/Table/TableData";
import TableHeader from "../../common/components/layout/Table/TableHeader";
import { formInputDate, numberWithCommas } from "../../common/utils";
import { MaintenanceHistoryAsset } from "../graphql";
import { Dropdown } from "./MaintenanceTableFilterDropdown";

interface MainenanceHistoryProps {
  maintenanceHistoryAsset: MaintenanceHistoryAsset[] | undefined;
  maintenanceTypes: TypeaheadItem[];
}

const MainentanceHistoryView = React.forwardRef<
  HTMLElement,
  MainenanceHistoryProps
>(function MainentanceHistoryView(
  { maintenanceHistoryAsset, maintenanceTypes },
  ref
) {
  const [sortedList, setSortedList] = useState(
    orderBy(maintenanceHistoryAsset, ["entry"], ["desc"])
  );
  maintenanceTypes = [{ title: "All", value: "ALL" }, ...maintenanceTypes];
  const [filter, setFilter] = useState(maintenanceTypes[0]);

  useEffect(() => {
    let list = maintenanceHistoryAsset;
    if (maintenanceHistoryAsset && filter && filter.value !== "ALL") {
      list = maintenanceHistoryAsset.filter(
        x => x.maintenanceCode.toLowerCase() === filter.value.toLowerCase()
      );
    }
    setSortedList(orderBy(list, ["entry"], ["desc"]));
  }, [filter, maintenanceHistoryAsset]);

  if (!maintenanceHistoryAsset || !maintenanceHistoryAsset[0]) {
    return <h1>No data found.</h1>;
  }

  const TotalsRow = () => {
    const m = sortedList;
    const arr = groupBy(m, a => a.postingDate.split("-")[0]);
    const sums = takeRight(
      map(arr, (v, k) => ({
        key: k,
        sum: `$${numberWithCommas(sumBy(v, "amount").toFixed())}`
      })),
      3
    );

    return (
      <div className="flex">
        {reverse(sums).map(t => (
          <div className="text-center w-full">
            <span className="block text-sm text-gray-500">{t.key}</span>
            <span className="text-gray-900">{t.sum}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full">
      <div className="w-full px-3 pt-3 bg-white">
        <Dropdown
          options={maintenanceTypes}
          value={filter}
          setValue={setFilter}
        />
      </div>
      <div className="sticky top-0 w-full p-3 bg-white border-b border-gray-400">
        <TotalsRow />
      </div>
      {/* </div> */}
      <div className="overflow-auto py-3 mx-6">
        <table className="divide-y divide-gray-200 min-w-full">
          <thead>
            <tr>
              <TableHeader children="Date" />
              <TableHeader children="Amount" />
              <TableHeader children="Pay To" />
              <TableHeader children="Doc No." />
              <TableHeader children="Maintenance Type" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 px-3">
            {sortedList.map((asset, i) => (
              <tr key={`${asset.postingDate}_${i}`}>
                <TableData children={formInputDate(asset.postingDate, true)} />
                <TableData
                  children={
                    <span className="flex justify-end">
                      {`$${asset.amount.toFixed()}`}
                    </span>
                  }
                />
                <TableData children={asset.payToName} />
                <TableData children={asset.documentNo} />
                <TableData children={asset.codeDescription} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default MainentanceHistoryView;
