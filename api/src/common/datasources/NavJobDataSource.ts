import { NavJob, NavJobPostingGroup, NavJobTask } from "../nav";
import NavDataSource from "./NavDataSource";
import { BooleanFilterExpression } from "../nav/filter";
import { filterExtensionDefinitions } from "@graphql-tools/schema";

export interface JobFilter {
  isOpen?: boolean;
  postingGroups?: string[];
  excludeLocations?: string[];
  includeLocations?: string[];
  includePostingGroups?: string[];
  excludePostingGroups?: string[];
  isShipment?: boolean;
}

export default class LivestockJobNavDataSource extends NavDataSource {
  getPostingGroups(prefix?: string) {
    let odataFilter;
    if (prefix) {
      odataFilter = this.buildFilter(f => f.startsWith("Code", prefix));
    }
    const filterStr = odataFilter ? `$filter=${odataFilter}` : "";
    return this.get(`/JobPostingGroups?${filterStr}`);
  }

  getPostingGroupsByCode(codes: string[]): Promise<NavJobPostingGroup[]> {
    return this.get(
      `/JobPostingGroups?$filter=${this.buildFilter(f =>
        f.or(...codes.map(code => f.equals("Code", code)))
      )}`
    );
  }

  getAllJobPostingGroups(): Promise<NavJobPostingGroup[]> {
    return this.get(`/JobPostingGroups`);
  }

  getByNo(no: string): Promise<NavJob | undefined> {
    const resp = this.get(`/Jobs('${no}')`).catch(() => null);
    return resp;
  }

  getAll({
    excludeLocations,
    includeLocations,
    includePostingGroups,
    excludePostingGroups,
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
      if (includeLocations && includeLocations.length > 0) {
        filters.push(
          f.or(...includeLocations.map(loc => f.equals("Site", loc)))
        );
      } else if (excludeLocations && excludeLocations.length > 0) {
        filters.push(
          f.and(...excludeLocations.map(loc => f.notEquals("Site", loc)))
        );
      }
      if (includePostingGroups && includePostingGroups.length > 0) {
        filters.push(
          f.or(
            ...includePostingGroups.map(pg => f.equals("Job_Posting_Group", pg))
          )
        );
      } else if (excludePostingGroups && excludePostingGroups.length > 0) {
        filters.push(
          f.and(
            ...excludePostingGroups.map(pg =>
              f.notEquals("Job_Posting_Group", pg)
            )
          )
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

  getJobTasks(number: string): Promise<NavJobTask[]> {
    let filter = this.buildFilter(f => f.equals("Job_No", number));
    return this.get(`/JobTasks?$filter=${filter}`);
  }

  //////////////////////////
  //  from JobLivestock   //
  //////////////////////////

  getJobLivestockByNo(no: string): Promise<NavJob | undefined> {
    const resp = this.get(`/JobsLivestock('${no}')`).catch(() => null);
    return resp;
  }

  getAllJobLivestock({
    excludeLocations,
    includeLocations,
    includePostingGroups,
    excludePostingGroups,
    isShipment
  }: JobFilter = {}): Promise<NavJob[]> {
    let odataFilter = this.buildFilter(f => {
      const filters: BooleanFilterExpression[] = [];
      if (includeLocations && includeLocations.length > 0) {
        filters.push(
          f.or(...includeLocations.map(loc => f.equals("Site", loc)))
        );
      } else if (excludeLocations && excludeLocations.length > 0) {
        filters.push(
          f.and(...excludeLocations.map(loc => f.notEquals("Site", loc)))
        );
      }
      if (includePostingGroups && includePostingGroups.length > 0) {
        filters.push(
          f.or(
            ...includePostingGroups.map(pg => f.equals("Job_Posting_Group", pg))
          )
        );
      } else if (excludePostingGroups && excludePostingGroups.length > 0) {
        filters.push(
          f.and(
            ...excludePostingGroups.map(pg =>
              f.notEquals("Job_Posting_Group", pg)
            )
          )
        );
      }
      if (isShipment) {
        filters.push(
          f.or(
            f.equals("Barn_Type", "Finisher"),
            f.equals("Barn_Type", "Wean to Finish")
          )
        );
        filters.push(f.greaterThan("Inventory_Left", 0));
      }
      return f.and(...filters);
    });
    const filterStr = odataFilter ? `$filter=${odataFilter}` : "";

    return this.get(`/JobsLivestock?${filterStr}`);
  }

  getJobsLivestockTasks(number: string): Promise<NavJobTask[]> {
    let filter = this.buildFilter(f => f.equals("Job_No", number));
    return this.get(`/JobTasks?$filter=${filter}`);
  }
}
