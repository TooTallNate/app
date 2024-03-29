import faker from "faker";
import * as Factory from "factory.ts";
import { ObjectId } from "mongodb";
import {
  NavUser,
  NavJob,
  NavResource,
  NavReason,
  NavLocation,
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType
} from "../src/common/nav";
import uuid from "uuid/v4";
import {
  SaveFarrowingBackendScorecardInput,
  PostFarrowingBackendScorecardInput,
  ScorecardEntryInput
} from "../src/common/graphql";
import { format } from "date-fns";

export function oneOf<T>(...list: T[]) {
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
  Start_Quantity: Factory.each(() => faker.random.number({ min: 1, max: 100 })),
  Start_Weight: Factory.each(() => faker.random.number({ min: 1, max: 100 })),
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
  livestocklets: Factory.each(() => ScorecardEntryInputFactory.build()),
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
  livestocklets: Factory.each(() => ScorecardEntryInputFactory.build()),
  feed: Factory.each(() => ScorecardEntryInputFactory.build()),
  water: Factory.each(() => ScorecardEntryInputFactory.build()),
  crate: Factory.each(() => ScorecardEntryInputFactory.build()),
  room: Factory.each(() => ScorecardEntryInputFactory.build())
});

export const LivestockAdjustmentFactory = Factory.Sync.makeFactory({
  event: Factory.each(() => faker.random.word()),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 1, max: 1000 })),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const LivestockGradeOffFactory = Factory.Sync.makeFactory({
  event: Factory.each(() => faker.random.word()),
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
  livestockWeight: Factory.each(() =>
    faker.random.number({ min: 50, max: 200 })
  ),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const LivestockMortalityFactory = Factory.Sync.makeFactory({
  event: Factory.each(() => faker.random.word()),
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
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const LivestockMoveFactory = Factory.Sync.makeFactory({
  event: Factory.each(() => faker.random.word()),
  fromJob: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  toJob: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 50, max: 1000 })),
  smallLivestockQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 50 })
  ),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const LivestockPurchaseFactory = Factory.Sync.makeFactory({
  event: Factory.each(() => faker.random.word()),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 1, max: 1000 })),
  smallLivestockQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 50 })
  ),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const LivestockWeanFactory = Factory.Sync.makeFactory({
  event: Factory.each(() => faker.random.word()),
  job: Factory.each(() => `job_faker.random.alphaNumeric(8)`),
  quantity: Factory.each(() => faker.random.number({ min: 50, max: 1000 })),
  smallLivestockQuantity: Factory.each(() =>
    faker.random.number({ min: 1, max: 50 })
  ),
  totalWeight: Factory.each(() => faker.random.number({ min: 50, max: 50000 })),
  comments: Factory.each(() => oneOf(undefined, faker.lorem.words(3)))
});

export const StandardJournalWeanFactory = Factory.Sync.makeFactory({
  Journal_Template_Name: NavItemJournalTemplate.Wean,
  Entry_Type: NavEntryType.Positive,
  Item_No: Factory.each(() => oneOf("01", "02", "03")),
  Description: "",
  Location_Code: "",
  Quantity: 0,
  Unit_Amount: Factory.each(() => faker.random.number({ min: 50, max: 150 })),
  Weight: 0,
  Job_No: "",
  Gen_Prod_Posting_Group: Factory.each(() => faker.random.word()),
  Shortcut_Dimension_1_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Shortcut_Dimension_2_Code: Factory.each(() => faker.random.alphaNumeric(3))
});

export const StandardJournalPurchaseFactory = Factory.Sync.makeFactory({
  Journal_Template_Name: NavItemJournalTemplate.Purchase,
  Entry_Type: NavEntryType.Positive,
  Item_No: Factory.each(() => oneOf("01", "02", "03")),
  Description: "",
  Location_Code: "",
  Quantity: 0,
  Unit_Amount: Factory.each(() => faker.random.number({ min: 50, max: 150 })),
  Weight: 0,
  Job_No: "",
  Gen_Prod_Posting_Group: Factory.each(() => faker.random.word()),
  Shortcut_Dimension_1_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Shortcut_Dimension_2_Code: Factory.each(() => faker.random.alphaNumeric(3))
});

export const StandardJournalGradeOffFactory = Factory.Sync.makeFactory({
  Journal_Template_Name: NavItemJournalTemplate.GradeOff,
  Entry_Type: NavEntryType.Negative,
  Item_No: Factory.each(() => oneOf("01", "02", "03")),
  Description: "",
  Location_Code: "",
  Quantity: 0,
  Unit_Amount: Factory.each(() => faker.random.number({ min: 50, max: 150 })),
  Weight: 0,
  Job_No: "",
  Gen_Prod_Posting_Group: Factory.each(() => faker.random.word()),
  Shortcut_Dimension_1_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Shortcut_Dimension_2_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Reason_Code: Factory.each(() => faker.random.word())
});

export const StandardJournalMoveFactory = Factory.Sync.makeFactory({
  Journal_Template_Name: NavItemJournalTemplate.Move,
  Entry_Type: "",
  Item_No: Factory.each(() => oneOf("01", "02", "03")),
  Description: "",
  Location_Code: "",
  Quantity: 0,
  Unit_Amount: Factory.each(() => faker.random.number({ min: 50, max: 150 })),
  Weight: 0,
  Job_No: "",
  Gen_Prod_Posting_Group: Factory.each(() => faker.random.word()),
  Shortcut_Dimension_1_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Shortcut_Dimension_2_Code: Factory.each(() => faker.random.alphaNumeric(3))
});

export const StandardJournalAdjustmentFactory = Factory.Sync.makeFactory({
  Journal_Template_Name: NavItemJournalTemplate.Adjustment,
  Entry_Type: NavEntryType.Positive,
  Item_No: Factory.each(() => oneOf("01", "02", "03")),
  Description: "",
  Location_Code: "",
  Quantity: 0,
  Unit_Amount: Factory.each(() => faker.random.number({ min: 50, max: 150 })),
  Weight: 0,
  Job_No: "",
  Gen_Prod_Posting_Group: Factory.each(() => faker.random.word()),
  Shortcut_Dimension_1_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Shortcut_Dimension_2_Code: Factory.each(() => faker.random.alphaNumeric(3))
});

export const StandardJournalMortalityFactory = Factory.Sync.makeFactory({
  Journal_Template_Name: NavItemJournalTemplate.Mortality,
  Entry_Type: NavEntryType.Negative,
  Item_No: Factory.each(() => oneOf("01", "02", "03")),
  Description: "",
  Location_Code: "",
  Quantity: 0,
  Unit_Amount: Factory.each(() => faker.random.number({ min: 50, max: 150 })),
  Weight: 0,
  Job_No: "",
  Gen_Prod_Posting_Group: Factory.each(() => faker.random.word()),
  Shortcut_Dimension_1_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Shortcut_Dimension_2_Code: Factory.each(() => faker.random.alphaNumeric(3)),
  Reason_Code: Factory.each(() => faker.random.word())
});

export const UserSettingsFactory = Factory.Sync.makeFactory({
  _id: Factory.each(() => new ObjectId()),
  username: Factory.each(() => faker.internet.userName()),
  livestockJob: Factory.each(() => faker.random.alphaNumeric(8)),
  prices: Factory.each<{ animal: string; price: number }[]>(() => []),
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
  livestocklets: generateScorecardEntry(0, 10),
  feed: generateScorecardEntry(0, 10),
  water: generateScorecardEntry(0, 10),
  crate: generateScorecardEntry(0, 10),
  room: generateScorecardEntry(0, 10)
});
