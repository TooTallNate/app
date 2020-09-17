import { NavJobJournalLine } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavJobJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavJobJournalLine>
  ): Promise<NavJobJournalLine> {
    return this.post("/JobJournal", entry);
  }
}
