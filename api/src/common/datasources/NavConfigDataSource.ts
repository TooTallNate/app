import { NavItem, NavReason } from "../nav";
import NavDataSource from "./NavDataSource";
import { BooleanFilterExpression } from "../nav/filter";

export interface AnimalTypeFilter {
  postingGroups: string[];
}

export default class NavConfigDataSouce extends NavDataSource {
  getItems({ postingGroups }: AnimalTypeFilter): Promise<NavItem[]> {
    let odataFilter = this.buildFilter(f => {
      const filters: BooleanFilterExpression[] = [];
      if (postingGroups) {
        filters.push(
          f.or(
            ...postingGroups.map(group =>
              f.equals("Gen_Prod_Posting_Group", group)
            )
          )
        );
      }
      return f.and(...filters);
    });
    return this.get(`/Items`, {
      $select: "No, Description",
      $filter: odataFilter || ""
    });
  }

  getReasonCodes(prefix: string): Promise<NavReason[]> {
    return this.get(
      `/ReasonCodes?$filter=${this.buildFilter(f =>
        f.startsWith("Code", prefix)
      )}`
    );
  }
}
