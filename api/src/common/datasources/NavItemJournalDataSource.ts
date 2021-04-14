import {
  ItemJournalTemplateObject,
  NavItemJournalLine,
  NavStandardItemJournal
} from "../nav";
import NavDataSource from "./NavDataSource";

export interface StandardJournalOptions {
  code: string;
  template: string;
}

export default class NavItemJournalDataSource extends NavDataSource {
  async postJournalLine(
    entry: Partial<NavItemJournalLine>
  ): Promise<NavItemJournalLine> {
    return this.post("/ItemJournal", entry);
  }

  async getStandardJournalLines(
    options: StandardJournalOptions
  ): Promise<NavItemJournalLine[]> {
    let filter = this.buildFilter(f =>
      f.and(
        f.equals("Journal_Template_Name", options.template),
        f.equals("Standard_Journal_Code", options.code)
      )
    );

    const lines = await this.get(`/StandardItemJournal?$filter=${filter}`);
    return lines.map(
      // We have to strip these out so that submitting these lines to the journal doesn't break.
      ({ Standard_Journal_Code, Line_No, ...line }: any) => line
    );
  }

  getStandardJournalByCode(
    options: StandardJournalOptions
  ): Promise<NavStandardItemJournal | null> {
    return this.get(
      `/StandardItemJournals(Journal_Template_Name='${options.template}', Code='${options.code}')`
    );
  }

  getItemJournalTemplate(): Promise<ItemJournalTemplateObject[] | null> {
    return this.get(`/ItemJournalTemplate`);
  }

  getStandardJournals(template: string): Promise<NavStandardItemJournal[]> {
    let filter = this.buildFilter(f =>
      f.equals("Journal_Template_Name", template)
    );

    return this.get(`/StandardItemJournals?$filter=${filter}`);
  }
}
