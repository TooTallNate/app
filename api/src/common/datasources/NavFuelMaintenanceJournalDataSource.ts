import { NavFuelMaintenanceJournalLine } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavFuelMaintenanceJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavFuelMaintenanceJournalLine>
  ): Promise<NavFuelMaintenanceJournalLine> {
    return this.post("/FixedAssetGLJournal", entry);
  }

  async autoPostFAJournals(
    template: string,
    batch: string,
    lines: number
  ): Promise<any> {
    return this.post(
      `/FixedAssetGLJournal('${template}','${batch}',${lines})/NAV.APP_Post`
    );
  }
}
