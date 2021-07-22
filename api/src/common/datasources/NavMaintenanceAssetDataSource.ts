import {
  NavMaintenanceExpense,
  NavFuelAsset,
  NavMaintenanceAsset,
  NavMaintenanceInterval,
  NavItem
} from "../nav";
import { BooleanFilterExpression } from "../nav/filter";
import NavDataSource from "./NavDataSource";
import { JobFilter } from "./NavJobDataSource";

export default class NavMaintenanceAssetDataSource extends NavDataSource {
  getAll({ excludeLocations, includeLocations }: JobFilter = {}): Promise<
    NavMaintenanceAsset[]
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
    return this.get(`/MaintenanceFixedAssets?${filterStr}`);
  }

  async getByNo(number: string): Promise<NavMaintenanceAsset | undefined> {
    let filter = this.buildFilter(f => f.equals("No", number));
    const [asset] = await this.get(`/MaintenanceFixedAssets?$filter=${filter}`);
    return asset;
  }

  getAllExpenseCodes(): Promise<NavMaintenanceExpense[]> {
    return this.get(`/MaintenanceExpenseCodes`);
  }

  async getExpenseByCode(code: string): Promise<NavMaintenanceExpense> {
    return this.get(`/MaintenanceExpenseCodes('${code}')`);
  }

  async getMaintenanceIntervalByAsset(
    assetNo: string
  ): Promise<NavMaintenanceInterval[]> {
    let filter = this.buildFilter(f => f.equals("Fixed_Asset_No", assetNo));
    const maintenanceInterval = await this.get(
      `/MaintenanceInterval?$filter=${filter}`
    );
    return maintenanceInterval;
  }

  async getItem(No: string): Promise<NavItem> {
    return this.get(`/Items('${No}')`);
  }
}
