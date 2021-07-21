import {
  NavMaintenanceExpense,
  NavFuelAsset,
  NavMaintenanceAsset,
  NavMaintenanceInterval,
  NavItem
} from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavMaintenanceAssetDataSource extends NavDataSource {
  getAll(): Promise<NavMaintenanceAsset[]> {
    return this.get(`/MaintenanceFixedAssets`);
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
