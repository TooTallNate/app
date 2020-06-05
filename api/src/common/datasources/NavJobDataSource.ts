import { NavJob } from "../nav";
import NavDataSource from "./NavDataSource";
import { BooleanFilterExpression } from "./nav-filter";

export interface JobFilter {
  isOpen?: boolean;
  postingGroups?: string[];
  excludeLocations?: string[];
  includeLocations?: string[];
}

export default class PigJobNavDataSource extends NavDataSource {
  getByNo(no: string): Promise<NavJob | undefined> {
    return this.get(`/Jobs('${no}')`);
  }

  getAll({
    excludeLocations,
    includeLocations,
    isOpen,
    postingGroups
  }: JobFilter = {}): Promise<NavJob[]> {
    let odataFilter = this.buildFilter(f => {
      const filters: BooleanFilterExpression[] = [];
      if (typeof isOpen === "boolean") {
        if (isOpen) {
          filters.push(f.equals("Status", "Open"));
        } else {
          filters.push(f.notEquals("Status", "Open"));
        }
      }
      if (postingGroups) {
        filters.push(
          f.or(
            ...postingGroups.map(group => f.equals("Job_Posting_Group", group))
          )
        );
      }
      if (includeLocations) {
        filters.push(
          f.or(...includeLocations.map(loc => f.equals("Site", loc)))
        );
      } else if (excludeLocations) {
        filters.push(
          f.and(...excludeLocations.map(loc => f.notEquals("Site", loc)))
        );
      }
      return f.and(...filters);
    });
    const filterStr = odataFilter ? `$filter=${odataFilter}` : "";

    return this.get(`/Jobs?${filterStr}`);
  }

  async updatePersonResponsible(
    number: string,
    person: string
  ): Promise<NavJob | undefined> {
    const job = (await this.getByNo(number)) as any;
    return this.patch(
      `/Jobs('${number}')`,
      { Person_Responsible: person },
      {
        headers: {
          "if-match": job["@odata.etag"]
        }
      }
    );
  }
}
