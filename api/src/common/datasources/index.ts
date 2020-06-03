import UserNavDataSource from "./UserNavDataSource";
import LocationNavDataSource from "./LocationNavDataSource";

export interface DataSources {
  [source: string]: any;
  userNavApi: UserNavDataSource;
  locationNavApi: LocationNavDataSource;
}

export default (): DataSources => {
  return {
    userNavApi: new UserNavDataSource(),
    locationNavApi: new LocationNavDataSource()
  };
};
