import { NavJobJournalLine, JobJournalTemplateObject } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavJobJournalDataSource extends NavDataSource {
  async postEntry(
    entry: Partial<NavJobJournalLine>
  ): Promise<NavJobJournalLine> {
    return this.post("/JobJournal", entry);
  }

  async autoPostJobJournals(
    template: string,
    batch: string,
    lines: number
  ): Promise<any> {
    return this.post(
      `/JobJournal('${template}','${batch}',${lines})/NAV.APP_Post`
    );
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
