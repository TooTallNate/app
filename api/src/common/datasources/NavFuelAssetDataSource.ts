import {
  NavMaintenanceExpense,
  NavFuelAsset,
  NavMaintenanceInterval
} from "../nav";
import { BooleanFilterExpression } from "../nav/filter";
import NavDataSource from "./NavDataSource";
import { JobFilter } from "./NavJobDataSource";

export default class NavFuelAssetDataSource extends NavDataSource {
  getAll({ excludeLocations, includeLocations }: JobFilter = {}): Promise<
    NavFuelAsset[]
  > {
    let odataFilter = this.buildFilter(f => {
      const filters: BooleanFilterExpression[] = [];
      if (includeLocations && includeLocations.length > 0) {
        filters.push(
          f.or(...includeLocations.map(loc => f.equals("Location_Code", loc)))
        );
      } else if (excludeLocations && excludeLocations.length > 0) {
        filters.push(
          f.and(
            ...excludeLocations.map(loc => f.notEquals("Location_Code", loc))
          )
        );
      }
      return f.and(...filters);
    });
    const filterStr = odataFilter ? `$filter=${odataFilter}` : "";
    return this.get(`/FuelFixedAssets?${filterStr}`);
  }

  async getByNo(number: string): Promise<NavFuelAsset | undefined> {
    let filter = this.buildFilter(f => f.equals("No", number));
    const [asset] = await this.get(`/FuelFixedAssets?$filter=${filter}`);
    return asset;
  }

  getAllExpenseCodes(): Promise<NavMaintenanceExpense[]> {
    return this.get(`/MaintenanceExpenseCodes`);
  }

  async getExpenseByCode(code: string): Promise<NavMaintenanceExpense> {
    return this.get(`/MaintenanceExpenseCodes('${code}')`);
  }
}
