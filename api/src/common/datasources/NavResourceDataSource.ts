import { NavResource } from "../nav";
import NavDataSource from "./NavDataSource";

export interface ResourceFilter {
  groups?: string[];
}

export default class NavResourceDataSource extends NavDataSource {
  getAll({ groups }: ResourceFilter = {}): Promise<NavResource[]> {
    let filter = this.buildFilter(f =>
      f.and(
        ...[
          !!groups &&
            f.or(...groups.map(group => f.equals("Resource_Group_No", group)))
        ].filter(Boolean)
      )
    );

    return this.get(`/Resources?$filter=${filter}`);
  }

  getByCode(code: string): Promise<NavResource | undefined> {
    return this.get(`/Resources('${code}')`);
  }
}
