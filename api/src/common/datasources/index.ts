import NavUserDataSource from "./NavUserDataSource";
import NavLocationDataSource from "./NavLocationDataSource";
import NavJobDataSource from "./NavJobDataSource";
import NavResourceDataSource from "./NavResourceDataSource";
import NavItemJournalDataSource from "./NavItemJournalDataSource";
import NavJobJournalDataSource from "./NavJobJournalDataSource";
import NavConfigDataSouce from "./NavConfigDataSource";
import NavFuelAssetDataSource from "./NavFuelAssetDataSource";
import NavMaintenanceAssetDataSource from "./NavMaintenanceAssetDataSource";
import NavFuelMaintenanceJournalDataSource from "./NavFuelMaintenanceJournalDataSource";
export interface DataSources {
  [source: string]: any;
  navUser: NavUserDataSource;
  navLocation: NavLocationDataSource;
  navJob: NavJobDataSource;
  navResource: NavResourceDataSource;
  navItemJournal: NavItemJournalDataSource;
  navJobJournal: NavJobJournalDataSource;
  navConfig: NavConfigDataSouce;
  navFuelAsset: NavFuelAssetDataSource;
  navMaintenanceAsset: NavMaintenanceAssetDataSource;
  navFuelMaintenanceJournal: NavFuelMaintenanceJournalDataSource;
}

export default (): DataSources => {
  return {
    navUser: new NavUserDataSource(),
    navLocation: new NavLocationDataSource(),
    navJob: new NavJobDataSource(),
    navResource: new NavResourceDataSource(),
    navItemJournal: new NavItemJournalDataSource(),
    navJobJournal: new NavJobJournalDataSource(),
    navConfig: new NavConfigDataSouce(),
    navFuelAsset: new NavFuelAssetDataSource(),
    navMaintenanceAsset: new NavMaintenanceAssetDataSource(),
    navFuelMaintenanceJournal: new NavFuelMaintenanceJournalDataSource()
  };
};
