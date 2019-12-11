import {
  NavCredentials,
  NavUser,
  NavJobSearch,
  NavJob,
  NavDimensionsSeach,
  NavDimension,
  NavItemJournalEntry,
  NavJobJournalEntry
} from "./types";
import request from "./request";
import { ntlm } from "httpntlm";

export interface NavClient {
  getUser(): Promise<NavUser>;
  getJobs(filter: NavJobSearch): Promise<NavJob[]>;
  getDimensions(filter: NavDimensionsSeach): Promise<NavDimension[]>;
  postItem(entry: NavItemJournalEntry): Promise<NavItemJournalEntry>;
  postJob(entry: NavJobJournalEntry): Promise<NavJobJournalEntry>;
}

export function hashPassword(password: string): [Buffer, Buffer] {
  return [
    ntlm.create_NT_hashed_password(password),
    ntlm.create_LM_hashed_password(password)
  ];
}

export default function createNavClient(creds: NavCredentials): NavClient {
  return {
    async getUser() {
      const { body } = await request.get<NavUser>({
        ...creds,
        resource: "User",
        filter: {
          User_Name: creds.username
        }
      });
      return body.value.length > 0 ? body.value[0] : null;
    },
    async getJobs(filter) {
      const { body } = await request.get<NavJob>({
        ...creds,
        resource: "Jobs",
        filter
      });
      return body.value;
    },
    async getDimensions(filter) {
      const { body } = await request.get<NavDimension>({
        ...creds,
        resource: "Dimensions",
        filter
      });
      return body.value;
    },
    async postItem(entry) {
      const { body } = await request.post<NavItemJournalEntry>({
        ...creds,
        resource: "ItemJournal",
        body: entry
      });
      return body;
    },
    async postJob(entry) {
      const { body } = await request.post<NavJobJournalEntry>({
        ...creds,
        resource: "JobJournal",
        body: entry
      });
      return body;
    }
  };
}
