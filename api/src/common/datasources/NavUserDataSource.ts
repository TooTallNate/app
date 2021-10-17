import { NavMenuOption, NavUser } from "../nav";
import NavDataSource from "./NavDataSource";
import { MenuOptions } from "../utils";

export default class NavUserDataSource extends NavDataSource {
  async login(username: string, password: string): Promise<NavUser> {
    const data = await this.get(
      `/Users?$filter=User_Name eq '${username}'`,
      null,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${username}:${password}`
          ).toString("base64")}`
        }
      }
    );
    return data[0];
  }

  getBySecurityID(id: string): Promise<NavUser | undefined> {
    return this.get(`/Users(${id})`);
  }

  async getByUsername(username: string): Promise<NavUser | undefined> {
    const filter = this.buildFilter(f => f.equals("User_Name", username));
    const [user] = await this.get(`/Users?$filter=${filter}`);
    return user;
  }

  getAll(): Promise<NavUser[]> {
    return this.get(`/Users`);
  }

  async getAllMenuOptions(): Promise<NavMenuOption[]> {
    return MenuOptions;
  }

  async getMenuOptions(names: string[]): Promise<NavMenuOption[]> {
    return MenuOptions.filter(item => names.includes(item.Name));
  }
}
