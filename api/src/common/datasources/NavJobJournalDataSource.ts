import { NavJobJournalTemplate, NavJobJournalLine } from "../nav";
import NavDataSource from "./NavDataSource";

interface AutoPostParams {
  templateName: string;
  batchName: string;
}

export default class NavJobJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavJobJournalLine>
  ): Promise<NavJobJournalLine> {
    return this.post("/JobJournal", entry);
  }

  async autoPostJobJournals(tempAndBatchName: AutoPostParams): Promise<any> {
    return this.post("/JobJournalAutoPost", tempAndBatchName);
  }

  getJobJournalTemplates(): Promise<NavJobJournalTemplate[] | null> {
    return this.get(`/JobJournalTemplate`);
  }

  getJobJournalTemplate(name: string): Promise<NavJobJournalTemplate | null> {
    return this.get(`/JobJournalTemplate('${name})`);
  }
}
