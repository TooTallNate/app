import { NavJob } from "../nav";
import NavDataSource from "./NavDataSource";
import { buildFilterFragment } from "./nav-filter";

export interface JobFilter {
  excludeLocations?: string[];
  includeLocations?: string[];
}

const jobFilter = buildFilterFragment(f =>
  f.and(
    f.and(
      f.equals("Status", "Open"),
      f.equals("Job_Posting_Group", "FARROW-BE")
    )
  )
);

export default class FarrowBackendJobNavDataSource extends NavDataSource {
  getByNo(no: string): Promise<NavJob | undefined> {
    return this.get(`/Jobs('${no}')`);
  }

  getAll(): Promise<NavJob[]> {
    let odataFilter = this.buildFilter(f => jobFilter);
    return this.get(`/Jobs?$filter=${odataFilter}`);
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
