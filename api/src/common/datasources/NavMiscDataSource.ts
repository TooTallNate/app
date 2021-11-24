import { NavDimensionPacker } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavMiscDataSource extends NavDataSource {
  getAllDimensionPackers(): Promise<NavDimensionPacker[]> {
    return this.get(`/DimensionPackers`);
  }
}
