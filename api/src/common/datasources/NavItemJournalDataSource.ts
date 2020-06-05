import { NavItemJournalEntry } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavItemJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavItemJournalEntry>
  ): Promise<NavItemJournalEntry> {
    return this.post("/ItemJournal", entry);
  }
}
