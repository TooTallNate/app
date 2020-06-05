import { NavUser } from "../nav";
import NavDataSource from "./NavDataSource";

export default class NavUserDataSource extends NavDataSource {
  async getByUsername(username: string): Promise<NavUser> {
    const data = await this.get(`/User?$filter=User_Name eq '${username}'`);
    return data[0];
  }

  getBySecurityID(id: string): Promise<NavUser | undefined> {
    return this.get(`/User(${id})`);
  }
}
