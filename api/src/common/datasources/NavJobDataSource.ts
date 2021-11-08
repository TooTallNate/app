import { NavJob, NavJobTask } from "../nav";
import NavDataSource from "./NavDataSource";
import { BooleanFilterExpression } from "../nav/filter";
import { filterExtensionDefinitions } from "@graphql-tools/schema";

export interface JobFilter {
  isOpen?: boolean;
  postingGroups?: string[];
  excludeLocations?: string[];
  includeLocations?: string[];
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

  getByNo(no: string): Promise<NavJob | undefined> {
    const resp = this.get(`/Jobs('${no}')`).catch(() => null);
    return resp;
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
      if (includeLocations && includeLocations.length > 0) {
        filters.push(
          f.or(...includeLocations.map(loc => f.equals("Site", loc)))
        );
      } else if (excludeLocations && excludeLocations.length > 0) {
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

  getJobTasks(number: string): Promise<NavJobTask[]> {
    let filter = this.buildFilter(f => f.equals("Job_No", number));
    return this.get(`/JobTasks?$filter=${filter}`);
  }

  //from JobLivestock

  getJobLivestockByNo(no: string): Promise<NavJob | undefined> {
    const resp = this.get(`/JobsLivestock('${no}')`).catch(() => null);
    return resp;
  }

  getAllJobLivestock({
    excludeLocations,
    includeLocations,
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
      if (isShipment) {
        filters.push(f.equals("Barn_Type", "Finisher"));
        filters.push(f.equals("Barn_Type", "Wean to Finish"));
        filters.push(f.notEquals("Barn_Type", ""));
        filters.push(f.notEquals("Barn_Type", " "));
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
