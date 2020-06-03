import UserNavDataSource from "./UserNavDataSource";
import LocationNavDataSource from "./LocationNavDataSource";
import PigJobNavDataSource from "./PigJobNavDataSource";

export interface DataSources {
  [source: string]: any;
  userNavApi: UserNavDataSource;
  locationNavApi: LocationNavDataSource;
  pigJobNavApi: PigJobNavDataSource;
}

export default (): DataSources => {
  return {
    userNavApi: new UserNavDataSource(),
    locationNavApi: new LocationNavDataSource(),
    pigJobNavApi: new PigJobNavDataSource()
  };
};
