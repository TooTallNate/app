import {
  ItemJournalTemplateObject,
  NavItem,
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

  getItemJournalTemplates(): Promise<ItemJournalTemplateObject[] | null> {
    return this.get(`/ItemJournalTemplate`);
  }

  getItemJournalTemplateByName(
    name: string
  ): Promise<ItemJournalTemplateObject | null> {
    return this.get(`/ItemJournalTemplate('${name}')`);
  }

  getAllByName(names: string[]): Promise<ItemJournalTemplateObject[]> {
    return this.get(
      `/ItemJournalTemplate?$filter=${this.buildFilter(f =>
        f.or(...names.map(name => f.equals("Name", name)))
      )}`
    );
  }

  getStandardJournals(template: string): Promise<NavStandardItemJournal[]> {
    let filter = this.buildFilter(f =>
      f.equals("Journal_Template_Name", template)
    );

    return this.get(`/StandardItemJournals?$filter=${filter}`);
  }

  getItem(No: string): Promise<NavItem> {
    return this.get(`/Items('${No}')`);
  }

  getFilteredItems(): Promise<NavItem[]> {
    return this.get(`/ItemConsumption`);
  }

  async autoPostItemJournals(
    template: string,
    batch: string,
    lines: number
  ): Promise<any> {
    return this.post(
      `/ItemJournal('${template}','${batch}',${lines})/NAV.APP_Post`
    );
  }
}
