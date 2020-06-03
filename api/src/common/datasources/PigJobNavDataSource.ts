import { NavJob } from "../nav";
import NavDataSource from "./NavDataSource";
import { buildFilterFragment } from "./nav-filter";

export interface JobFilter {
  excludeLocations?: string[];
  includeLocations?: string[];
}

const pigJobFilter = buildFilterFragment(f =>
  f.and(
    f.equals("Status", "Open"),
    f.or(
      f.equals("Job_Posting_Group", "MKT PIGS"),
      f.equals("Job_Posting_Group", "SOWS"),
      f.equals("Job_Posting_Group", "GDU")
    )
  )
);

export default class PigJobNavDataSource extends NavDataSource {
  getByNo(no: string): Promise<NavJob | undefined> {
    return this.get(`/Jobs('${no}')`);
  }

  getAll({ excludeLocations, includeLocations }: JobFilter): Promise<NavJob[]> {
    let odataFilter = this.buildFilter(f => {
      if (includeLocations) {
        return f.and(
          pigJobFilter,
          f.or(...includeLocations.map(loc => f.equals("Site", loc)))
        );
      } else if (excludeLocations) {
        return f.and(
          pigJobFilter,
          f.and(...excludeLocations.map(loc => f.notEquals("Site", loc)))
        );
      } else {
        return pigJobFilter;
      }
    });
    return this.get(`/Jobs?$filter=${odataFilter}`);
  }
}
