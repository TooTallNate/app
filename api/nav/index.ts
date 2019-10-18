import {
  NavCredentials,
  NavUser,
  NavJobSearch,
  NavJob,
  NavItemEntry,
  NewNavItemEntry
} from "./types";
import request from "./request";

export default {
  async getUser(
    username: string,
    { username: domainUsername, password }: NavCredentials
  ): Promise<NavUser | null> {
    const url = `${process.env.NAV_BASE_URL}/User?$filter=User_Name eq '${username}'&$select=Full_Name,License_Type`;
    const { body, statusCode } = await request({
      url,
      domainUsername,
      password,
      method: "get"
    });
    if (statusCode === 200 && body && body.value.length === 1) {
      return body.value[0];
    } else {
      return null;
    }
  },
  async getJobs(
    { Status = [], Job_Posting_Group = [] }: NavJobSearch,
    { username: domainUsername, password }: NavCredentials
  ): Promise<NavJob[] | null> {
    let statusFilter = Status.map(status => `Status eq '${status}'`).join(
      " or "
    );
    let postingGroupFilter = Job_Posting_Group.map(
      posting => `Job_Posting_Group eq '${posting}'`
    ).join(" or ");
    let filter = [
      statusFilter ? `(${statusFilter})` : false,
      postingGroupFilter ? `(${postingGroupFilter})` : false
    ]
      .filter(Boolean)
      .join(" and ");
    const url = `${process.env.NAV_BASE_URL}/Jobs?&$format=json${
      filter ? `&$filter=${filter}` : ""
    }`;
    const { body, statusCode } = await request({
      url,
      domainUsername,
      password,
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
    { username: domainUsername, password }: NavCredentials
  ): Promise<NavItemEntry | null> {
    const url = `${process.env.NAV_BASE_URL}/ItemJournal?&$format=json`;
    const { body, statusCode } = await request({
      url,
      domainUsername,
      password,
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
