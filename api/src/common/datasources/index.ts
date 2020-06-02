import UserNavDataSource from "./UserNavDataSource";

export default () => {
  return {
    userNavApi: new UserNavDataSource()
  };
};
