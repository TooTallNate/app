import {
  NavItem,
  NavMaintenanceAsset,
  NavMaintenanceExpense,
  NavMaintenanceHistoryAsset
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

  async getHistory(
    fa_number: string
  ): Promise<[NavMaintenanceHistoryAsset] | undefined> {
    return await this.get(`/MaintenanceLedger?$filter=FA_No eq '${fa_number}'`);
  }

  getAllExpenseCodes(): Promise<NavMaintenanceExpense[]> {
    return this.get(`/MaintenanceExpenseCodes`);
  }

  async getExpenseByCode(code: string): Promise<NavMaintenanceExpense> {
    return this.get(`/MaintenanceExpenseCodes('${code}')`);
  }

  async getAssetsByNo(assetNo: string): Promise<NavMaintenanceAsset[]> {
    let filter = this.buildFilter(f => f.equals("Fixed_Asset_No", assetNo));
    const maintenanceAssets = await this.get(
      `/MaintenanceFixedAssets?$filter=${filter}`
    );
    return maintenanceAssets;
  }

  async getItem(No: string): Promise<NavItem> {
    return this.get(`/Items('${No}')`);
  }
}
