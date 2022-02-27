import {
  NavJobJournalTemplate,
  NavJobJournalLine,
  JobJournalTemplateObject
} from "../nav";
import NavDataSource from "./NavDataSource";

interface AutoPostParams {
  templateName: string;
  batchName: string;
  lines: number;
}

export default class NavJobJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavJobJournalLine>
  ): Promise<NavJobJournalLine> {
    return this.post("/JobJournal", entry);
  }

  async autoPostJobJournals(autoPostParams: AutoPostParams): Promise<any> {
    return this.post(`/JobJournal(${autoPostParams})/NAV.APP_Post`);
  }

  getJobJournalTemplates(): Promise<JobJournalTemplateObject[] | null> {
    return this.get(`/JobJournalTemplate`);
  }

  getJobJournalTemplate(
    name: string
  ): Promise<JobJournalTemplateObject | null> {
    return this.get(`/JobJournalTemplate('${name}')`);
  }
}
