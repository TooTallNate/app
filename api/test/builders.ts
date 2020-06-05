import faker from "faker";
import * as Factory from "factory.ts";
import { ObjectId } from "mongodb";
import {
  NavUser,
  NavJob,
  NavResource,
  NavReason,
  NavLocation
} from "../src/common/nav";
import uuid from "uuid/v4";
import {
  SaveFarrowingBackendScorecardInput,
  PostFarrowingBackendScorecardInput,
  ScorecardEntryInput
} from "../src/common/graphql";
import { format } from "date-fns";

function oneOf<T>(...list: T[]) {
  return list[faker.random.number({ min: 0, max: list.length - 1 })];
}

export const UserFactory = Factory.Sync.makeFactory<NavUser>({
  User_Security_ID: Factory.each(() => uuid()),
  Full_Name: Factory.each(() => faker.name.firstName().toUpperCase()),
  License_Type: Factory.each(() => oneOf("Full User", "Limited User")),
  User_Name: Factory.each(() => faker.internet.userName())
});

export const JobFactory = Factory.Sync.makeFactory<NavJob>({
  No: Factory.each(() => `job_${faker.random.alphaNumeric(8)}`),
  Description: Factory.each(() => faker.lorem.words(2)),
  Person_Responsible: Factory.each(() => faker.name.firstName().toUpperCase()),
  Barn_Type: Factory.each(() => oneOf("Nursery", "Finisher")),
  Site: Factory.each(() =>
    faker.random.number({ min: 10, max: 999 }).toString()
  ),
  Entity: Factory.each(() => oneOf("01", "02", "03")),
  Cost_Center: Factory.each(() =>
    faker.random.number({ min: 100, max: 299 }).toString()
  ),
  Inventory_Left: Factory.each(() =>
    faker.random.number({ min: 0, max: 4000 })
  ),
  Dead_Quantity: Factory.each(() => faker.random.number({ min: 0, max: 100 })),
  Start_Quantity: Factory.each(() => faker.random.number({ min: 0, max: 100 })),
  Start_Weight: Factory.each(() => faker.random.number({ min: 0, max: 100 })),
  Start_Date: Factory.each(() => format(faker.date.past(), "yyyy-MM-dd"))
});

export const ResourceFactory = Factory.Sync.makeFactory<NavResource>({
  Name: Factory.each(() => faker.name.firstName()),
  No: Factory.each(() => `resource_${faker.random.alphaNumeric(8)}`)
});

export const LocationFactory = Factory.Sync.makeFactory<NavLocation>({
  Name: Factory.each(() => faker.name.firstName()),
  Code: Factory.each(() => `${faker.random.alphaNumeric(2)}`)
});

export const ReasonFactory = Factory.Sync.makeFactory<NavReason>({
  Code: Factory.each(() => faker.random.alphaNumeric(4).toUpperCase()),
  Description: Factory.each(() => faker.random.word())
});

export const ScorecardEntryInputFactory = Factory.Sync.makeFactory<
  ScorecardEntryInput
>({
  score: Factory.each(() => faker.random.number({ min: 0, max: 10 })),
  comments: Factory.each(() => faker.lorem.words(3))
});

export const PostFarrowingBackendScorecardInputFactory = Factory.Sync.makeFactory<
  PostFarrowingBackendScorecardInput
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

export const SaveFarrowingBackendScorecardInputFactory = Factory.Sync.makeFactory<
  SaveFarrowingBackendScorecardInput
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

export const PigAdjustmentFactory = Factory.Sync.makeFactory({
  animal: Factory.each(() => oneOf("01", "02", "03")),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 1, max: 1000 })),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  price: undefined as number | undefined,
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
}).withDerivation1(["quantity"], "price", quantity =>
  quantity > 0 ? faker.random.number({ min: 30, max: 150 }) : undefined
);

export const PigGradeOffFactory = Factory.Sync.makeFactory({
  animal: Factory.each(() => oneOf("01", "02", "03")),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantities: Factory.each(() => [
    {
      code: oneOf("GR-RESP", "GR-BRUPT"),
      quantity: faker.random.number({ min: 1, max: 50 })
    },
    {
      code: oneOf("GR-SRUPT", "GR-LAME"),
      quantity: faker.random.number({ min: 1, max: 50 })
    },
    {
      code: oneOf("GR-UNTHRIF", "GR-DOA"),
      quantity: faker.random.number({ min: 1, max: 50 })
    }
  ]),
  pigWeight: Factory.each(() => faker.random.number({ min: 50, max: 200 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const PigMortalityFactory = Factory.Sync.makeFactory({
  animal: Factory.each(() => oneOf("01", "02", "03")),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  euthanizedQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 500 })
  ),
  naturalQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 500 })
  ),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const PigMoveFactory = Factory.Sync.makeFactory({
  fromAnimal: Factory.each(() => oneOf("01", "02", "03")),
  toAnimal: Factory.each(() => oneOf("01", "02", "03")),
  fromJob: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  toJob: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 50, max: 1000 })),
  smallPigQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 50 })
  ),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  price: Factory.each(() => faker.random.number({ min: 30, max: 150 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const PigPurchaseFactory = Factory.Sync.makeFactory({
  animal: Factory.each(() => oneOf("01", "02", "03")),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 1, max: 1000 })),
  smallPigQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 50 })
  ),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  price: Factory.each(() => faker.random.number({ min: 30, max: 150 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const PigWeanFactory = Factory.Sync.makeFactory({
  animal: Factory.each(() => oneOf("01", "02", "03")),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 50, max: 1000 })),
  smallPigQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 50 })
  ),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  price: Factory.each(() => faker.random.number({ min: 30, max: 150 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const UserSettingsFactory = Factory.Sync.makeFactory({
  _id: Factory.each(() => new ObjectId()),
  username: Factory.each(() => faker.internet.userName()),
  pigJob: Factory.each(() => faker.random.alphaNumeric(8)),
  price: Factory.each(() => faker.random.number({ min: 30, max: 150 })),
  locations: Factory.each(() => ({
    mode: oneOf("INCLUDE", "EXCLUDE"),
    list: Array.from({ length: faker.random.number({ min: 2, max: 4 }) }, () =>
      faker.random.alphaNumeric(2)
    )
  }))
});

function generateScorecardEntry(min: number, max: number) {
  return {
    score: faker.random.number({ min, max }),
    ...(faker.random.boolean() && { comments: faker.lorem.words(3) })
  };
}

export const FarrowingBackendScorecardFactory = Factory.Sync.makeFactory({
  _id: Factory.each(() => new ObjectId()),
  area: Factory.each(() => `Room ${faker.random.number({ min: 1, max: 9 })}`),
  operator: Factory.each(() => faker.name.firstName().toUpperCase()),
  sows: generateScorecardEntry(0, 10),
  piglets: generateScorecardEntry(0, 10),
  feed: generateScorecardEntry(0, 10),
  water: generateScorecardEntry(0, 10),
  crate: generateScorecardEntry(0, 10),
  room: generateScorecardEntry(0, 10)
});
