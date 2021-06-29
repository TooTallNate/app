import { NavFuelMaintenanceJournalLine } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavFuelMaintenanceJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavFuelMaintenanceJournalLine>
  ): Promise<NavFuelMaintenanceJournalLine> {
    return this.post("/FixedAssetGLJournal", entry);
  }
}
