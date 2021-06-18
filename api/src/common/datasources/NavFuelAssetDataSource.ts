import { NavExpenseCode, NavFuelAsset, NavMaintenanceInterval } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavFuelAssetDataSource extends NavDataSource {
  getAll(): Promise<NavFuelAsset[]> {
    return this.get(`/FuelFixedAssets`);
  }

  async getByNo(number: string): Promise<NavFuelAsset | undefined> {
    let filter = this.buildFilter(f => f.equals("No", number));
    const [asset] = await this.get(`/FuelFixedAssets?$filter=${filter}`);
    return asset;
  }

  getAllExpenseCodes(): Promise<NavExpenseCode[]> {
    return this.get(`/MaintenanceExpsenseCodes`);
  }

  async getExpenseByCode(code: string): Promise<NavExpenseCode> {
    return this.get(`/MaintenanceExpenseCodes('${code}')`);
  }

  async getMaintenanceIntervalByAsset(
    assetNo: string
  ): Promise<NavMaintenanceInterval | undefined> {
    let filter = this.buildFilter(f => f.equals("Fixed_Asset_No", assetNo));
    const [maintenanceInterval] = await this.get(
      `/MaintenanceInterval?$filter=${filter}`
    );
    return maintenanceInterval;
  }
}
