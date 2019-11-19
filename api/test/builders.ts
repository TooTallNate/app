import faker from "faker";
import * as Factory from "factory.ts";
import { NavJob, NavUser, NavDimension } from "../nav/types";
import uuid from "uuid/v4";

const JOB_POSTING_GROUPS = ["MKT PIGS", "GDU", "SOWS", "CATTLE", "FARROW-BE"];
const JOB_STATUSES = ["Planning", "Open", "Complete"];
const DIMENSION_CODES = ["ENTITY", "COST CENTER"];

const oneOf = (list: any[]): (() => any) => () =>
  list[faker.random.number({ min: 0, max: list.length - 1 })];

export const userFactory = Factory.Sync.makeFactory<NavUser>({
  User_Security_ID: Factory.each(() => uuid()),
  Full_Name: Factory.each(() => faker.name.findName()),
  License_Type: "Full User"
});

export const jobFactory = Factory.Sync.makeFactory<NavJob>({
  No: Factory.each(() => faker.random.alphaNumeric(8)),
  Job_Posting_Group: Factory.each(oneOf(JOB_POSTING_GROUPS)),
  Site: Factory.each(() => faker.random.number({ min: 1, max: 99 }).toString()),
  Status: Factory.each(oneOf(JOB_STATUSES))
});

export const dimensionFactory = Factory.Sync.makeFactory<NavDimension>({
  Table_ID: 167,
  No: Factory.each(() => faker.random.alphaNumeric(8)),
  Dimension_Code: Factory.each(oneOf(DIMENSION_CODES)),
  Dimension_Value_Code: Factory.each(() =>
    faker.random.number({ min: 1, max: 500 }).toString()
  ),
  Value_Posting: "Code Mandatory"
});