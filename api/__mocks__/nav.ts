import faker from "faker";
import { jobFactory, userFactory } from "../test/builders";
import { NavJobSearch } from "../nav";

interface Credentials {
  username: string;
  password: string;
}

const jobs = jobFactory.buildList(100);
const user = userFactory.build();
const credentials: Credentials = {
  username: `${faker.internet.domainName()}\\${faker.internet.userName()}`,
  password: faker.internet.password()
};

function validCredentials(creds: Credentials): boolean {
  return (
    credentials.username === creds.username &&
    credentials.password === creds.password
  );
}

export default {
  jobs,
  user,
  credentials,
  getUser: jest
    .fn()
    .mockImplementation((username: string, creds: Credentials) => {
      if (username === credentials.username && validCredentials(creds)) {
        return Promise.resolve(user);
      } else {
        return Promise.resolve(null);
      }
    }),
  getJobs: jest
    .fn()
    .mockImplementation((search: NavJobSearch, creds: Credentials) => {
      if (!validCredentials(creds)) {
        return Promise.resolve(null);
      }
      let result = jobs;
      if (search.Status && search.Status.length > 0) {
        result = result.filter(job => search.Status.includes(job.Status));
      }
      if (search.Job_Posting_Group && search.Job_Posting_Group.length > 0) {
        result = result.filter(job =>
          search.Job_Posting_Group.includes(job.Job_Posting_Group)
        );
      }
      return Promise.resolve(result);
    })
};
