import { NavAnimal, NavReason } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavConfigDataSouce extends NavDataSource {
  getPigTypes(): Promise<NavAnimal[]> {
    return this.get("/PigTypes");
  }

  getReasonCodes(prefix: string): Promise<NavReason[]> {
    return this.get(
      `/ReasonCodes?$filter=${this.buildFilter(f =>
        f.startsWith("Code", prefix)
      )}`
    );
  }
}
