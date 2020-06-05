import NavUserDataSource from "./NavUserDataSource";
import NavLocationDataSource from "./NavLocationDataSource";
import NavJobDataSource from "./NavJobDataSource";
import NavResourceDataSource from "./NavResourceDataSource";

export interface DataSources {
  [source: string]: any;
  navUser: NavUserDataSource;
  navLocation: NavLocationDataSource;
  navJob: NavJobDataSource;
  navResource: NavResourceDataSource;
}

export default (): DataSources => {
  return {
    navUser: new NavUserDataSource(),
    navLocation: new NavLocationDataSource(),
    navJob: new NavJobDataSource(),
    navResource: new NavResourceDataSource()
  };
};
