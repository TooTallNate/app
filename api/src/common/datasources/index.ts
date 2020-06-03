import UserNavDataSource from "./UserNavDataSource";
import LocationNavDataSource from "./LocationNavDataSource";
import PigJobNavDataSource from "./PigJobNavDataSource";
import FarrowBackendJobNavDataSource from "./FarrowBackendJobNavDataSource";

export interface DataSources {
  [source: string]: any;
  userNavApi: UserNavDataSource;
  locationNavApi: LocationNavDataSource;
  pigJobNavApi: PigJobNavDataSource;
  farrowBackendJobNavApi: FarrowBackendJobNavDataSource;
}

export default (): DataSources => {
  return {
    userNavApi: new UserNavDataSource(),
    locationNavApi: new LocationNavDataSource(),
    pigJobNavApi: new PigJobNavDataSource(),
    farrowBackendJobNavApi: new FarrowBackendJobNavDataSource()
  };
};
