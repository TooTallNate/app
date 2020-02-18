import faker from "faker";
import * as Factory from "factory.ts";
import { ObjectId } from "mongodb";
import { NavUser, NavJob, NavDimension, NavDimensionCode } from "../nav/types";
import uuid from "uuid/v4";
import {
  FarrowingBackendScorecardInput,
  ScorecardEntry,
  PigAdjustmentInput
} from "../resolvers/types";

function oneOf<T>(...list: T[]) {
  return list[faker.random.number({ min: 0, max: list.length - 1 })];
}

export const UserFactory = Factory.Sync.makeFactory<NavUser>({
  User_Security_ID: Factory.each(() => uuid()),
  Full_Name: Factory.each(() => faker.name.findName()),
  License_Type: Factory.each(() => oneOf("Full User", "Limited User")),
  User_Name: Factory.each(() => faker.internet.userName())
});

export const JobFactory = Factory.Sync.makeFactory<NavJob>({
  No: Factory.each(() => faker.random.alphaNumeric(8)),
  Description: Factory.each(() => faker.lorem.words(2)),
  Person_Responsible: Factory.each(() => faker.name.firstName().toUpperCase()),
  Site: Factory.each(() =>
    faker.random.number({ min: 10, max: 999 }).toString()
  )
});

export const DimensionFactory = Factory.Sync.makeFactory<NavDimension>({
  Dimension_Code: Factory.each(() =>
    oneOf(NavDimensionCode.CostCenter, NavDimensionCode.Entity)
  ),
  Dimension_Value_Code: Factory.each(() => faker.random.alphaNumeric(8))
});

export const ScorecardEntryInputFactory = Factory.Sync.makeFactory<
  ScorecardEntry
>({
  score: Factory.each(() => faker.random.number({ min: 0, max: 10 })),
  comments: Factory.each(() => faker.lorem.words(3))
});

export const FarrowingBackendScorecardInputFactory = Factory.Sync.makeFactory<
  FarrowingBackendScorecardInput
>({
  area: Factory.each(() => faker.random.alphaNumeric(8)),
  operator: Factory.each(() => faker.name.firstName().toUpperCase()),
  sows: Factory.each(() => ScorecardEntryInputFactory.build()),
  piglets: Factory.each(() => ScorecardEntryInputFactory.build()),
  feed: Factory.each(() => ScorecardEntryInputFactory.build()),
  water: Factory.each(() => ScorecardEntryInputFactory.build()),
  crate: Factory.each(() => ScorecardEntryInputFactory.build()),
  room: Factory.each(() => ScorecardEntryInputFactory.build())
});

export const PigAdjustmentInputFactory = Factory.Sync.makeFactory<
  PigAdjustmentInput
>({
  animal: Factory.each(() => oneOf("01", "02", "03")),
  job: Factory.each(() => faker.random.alphaNumeric(8)),
  quantity: Factory.each(() => faker.random.number({ min: 1, max: 1000 })),
  weight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  price: Factory.each(() => faker.random.number({ min: 30, max: 150 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const UserSettingsFactory = Factory.Sync.makeFactory({
  _id: Factory.each(() => new ObjectId()),
  username: Factory.each(() => faker.internet.userName()),
  pigJob: Factory.each(() => faker.random.alphaNumeric(8)),
  price: Factory.each(() => faker.random.number({ min: 30, max: 150 }))
});
