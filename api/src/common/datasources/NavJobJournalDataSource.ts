import { NavJobJournalEntry } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavJobJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavJobJournalEntry>
  ): Promise<NavJobJournalEntry> {
    return this.post("/JobJournal", entry);
  }
}
