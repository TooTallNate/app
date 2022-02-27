import { NavFuelMaintenanceJournalLine } from "../nav";
import NavDataSource from "./NavDataSource";

interface AutoPostParams {
  templateName: string;
  batchName: string;
  lines: number;
}

export default class NavFuelMaintenanceJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavFuelMaintenanceJournalLine>
  ): Promise<NavFuelMaintenanceJournalLine> {
    return this.post("/FixedAssetGLJournal", entry);
  }

  async autoPostFAJournals(autoPostParams: AutoPostParams): Promise<any> {
    return this.post(`/FixedAssetGLJournal(${autoPostParams})/NAV.APP_Post`);
  }
}
