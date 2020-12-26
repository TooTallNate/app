import { NavLocation } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavLocationDataSource extends NavDataSource {
  getAll(): Promise<NavLocation[]> {
    return this.get(`/Locations`);
  }

  getAllByCode(codes: string[]): Promise<NavLocation[]> {
    return this.get(
      `/Locations?$filter=${this.buildFilter(f =>
        f.or(...codes.map(code => f.equals("Code", code)))
      )}`
    );
  }

  getByCode(code: string): Promise<NavLocation> {
    return this.get(`/Locations('${code}')`);
  }
}
