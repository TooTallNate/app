import {
  NavCredentials,
  NavUser,
  NavJobSearch,
  NavJob,
  NavItemEntry,
  NewNavItemEntry,
  NavDimensionSearch,
  NavDimension
} from "./types";
import request from "./request";

export default {
  async getUser(
    username: string,
    creds: NavCredentials
  ): Promise<NavUser | null> {
    const { body, statusCode } = await request({
      ...creds,
      resource: "User",
      filter: {
        User_Name: username
      },
      method: "get"
    });
    console.log({ body, statusCode });
    if (statusCode === 200 && body && body.value.length === 1) {
      return body.value[0];
    } else {
      return null;
    }
  },
  async getJobs(
    filter: NavJobSearch,
    creds: NavCredentials
  ): Promise<NavJob[] | null> {
    const { body, statusCode } = await request({
      ...creds,
      resource: "Jobs",
      filter,
      method: "get"
    });
    if (statusCode === 200 && body && Array.isArray(body.value)) {
      return body.value;
    } else {
      return null;
    }
  },
  async getDimensions(
    filter: NavDimensionSearch,
    creds: NavCredentials
  ): Promise<NavDimension[]> {
    const { body, statusCode } = await request({
      ...creds,
      resource: "Dimensions",
      filter,
      method: "get"
    });
    if (statusCode === 200 && body && Array.isArray(body.value)) {
      return body.value;
    } else {
      return null;
    }
  },
  async postItem(
    entry: NewNavItemEntry,
    creds: NavCredentials
  ): Promise<NavItemEntry | null> {
    const { body, statusCode } = await request({
      ...creds,
      resource: "ItemJournal",
      method: "post",
      body: entry
    });
    console.log(statusCode);
    console.log(body);
    if (statusCode === 201 && body) {
      return body as any;
    } else {
      return null;
    }
  }
};
