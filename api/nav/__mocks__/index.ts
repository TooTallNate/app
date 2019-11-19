import faker from "faker";
import { jobFactory, userFactory, dimensionFactory } from "../../test/builders";
import {
  NavJobSearch,
  NavCredentials,
  NavJob,
  NavUser,
  NavDimension,
  NavDimensionSearch
} from "../types";
import { NavClient } from "..";
const { hashPassword } = jest.requireActual("../index");

export { hashPassword };

interface PasswordMock extends NavCredentials {
  password: string;
}

export class NavMock {
  private creds: Omit<PasswordMock, "password">;
  jobs: NavJob[];
  dimensions: NavDimension[];
  user: NavUser;
  credentials: PasswordMock;
  getUser: jest.Mock<any, any>;
  getJobs: jest.Mock<any, any>;
  getDimensions: jest.Mock<any, any>;
  postItem: jest.Mock<any, any>;

  constructor() {
    this.getUser = jest.fn();
    this.getJobs = jest.fn();
    this.getDimensions = jest.fn();
    this.postItem = jest.fn();
  }

  createNavClient(creds: Omit<PasswordMock, "password">) {
    this.creds = creds;
    return this;
  }

  validCredentials(): boolean {
    return (
      this.credentials.username === this.creds.username &&
      this.credentials.ntPassword.equals(this.creds.ntPassword) &&
      this.credentials.lmPassword.equals(this.creds.lmPassword)
    );
  }

  generateData() {
    this.jobs = jobFactory.buildList(100);
    this.user = userFactory.build();
    this.dimensions = this.jobs.reduce((arr, job) => {
      arr.push(
        dimensionFactory.build({
          No: job.No,
          Dimension_Code: "ENTITY"
        })
      );
      arr.push(
        dimensionFactory.build({
          No: job.No,
          Dimension_Code: "COST CENTER"
        })
      );
      return arr;
    }, []);
    const password = faker.internet.password();
    const [ntPassword, lmPassword] = hashPassword(password);
    this.credentials = {
      username: `${faker.internet.domainName()}\\${faker.internet.userName()}`,
      password,
      ntPassword,
      lmPassword
    };
  }

  mockReset() {
    this.generateData();

    this.getUser.mockReset();
    this.getUser.mockImplementation(() => {
      if (this.validCredentials()) {
        return Promise.resolve(this.user);
      } else {
        return Promise.resolve(null);
      }
    });

    this.getJobs.mockReset();
    this.getJobs.mockImplementation((search: NavJobSearch) => {
      if (!this.validCredentials()) {
        return Promise.resolve(null);
      }
      let result = this.jobs;
      if (search.Status && search.Status.length > 0) {
        result = result.filter(job => search.Status.includes(job.Status));
      }
      if (search.Job_Posting_Group && search.Job_Posting_Group.length > 0) {
        result = result.filter(job =>
          search.Job_Posting_Group.includes(job.Job_Posting_Group)
        );
      }
      return Promise.resolve(result);
    });

    this.getDimensions.mockReset();
    this.getDimensions.mockImplementation((search: NavDimensionSearch) => {
      if (!this.validCredentials()) {
        return Promise.resolve(null);
      }
      let result = this.dimensions;
      if (search.No && search.No.length > 0) {
        result = result.filter(dim => search.No.includes(dim.No));
      }
      if (search.Table_ID && search.Table_ID.length > 0) {
        result = result.filter(dim => search.Table_ID.includes(dim.Table_ID));
      }
      return Promise.resolve(result);
    });

    this.postItem.mockReset();
    this.postItem.mockImplementation((item: any) => {
      if (!this.validCredentials()) {
        return Promise.resolve(null);
      }
      return Promise.resolve({ ...item });
    });
  }
}

export const mock = new NavMock();

export default (creds: NavCredentials): NavClient =>
  mock.createNavClient(creds);