import gql from "graphql-tag";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
};

export type Job = {
  __typename?: "Job";
  number: Scalars["String"];
  site: Scalars["String"];
};

export type JobSearchInput = {
  status?: Maybe<Array<Scalars["String"]>>;
  postingGroup?: Maybe<Array<Scalars["String"]>>;
};

export type LoginInput = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login: User;
  logout: Scalars["Boolean"];
  postItemEntry: Scalars["Boolean"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationPostItemEntryArgs = {
  input: PostItemEntryInput;
};

export type PostItemEntryInput = {
  template: Scalars["String"];
  batch: Scalars["String"];
  date: Scalars["Date"];
  entryType: Scalars["String"];
  document: Scalars["String"];
  item: Scalars["String"];
  description: Scalars["String"];
  location: Scalars["String"];
  quantity: Scalars["Float"];
  amount: Scalars["Float"];
  weight: Scalars["Float"];
  job: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  user: User;
  jobs: Array<Job>;
};

export type QueryJobsArgs = {
  input?: Maybe<JobSearchInput>;
};

export type User = {
  __typename?: "User";
  license: Scalars["String"];
  name: Scalars["String"];
};
