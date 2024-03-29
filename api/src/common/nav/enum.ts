export enum NavItemJournalTemplate {
  Mortality = "MORTALITY",
  Adjustment = "QTYADJ",
  GradeOff = "GRADEOFF",
  Move = "MOVE",
  Wean = "WEAN",
  Purchase = "PURCHASE",
  Shipment = "SHIPMENT",
  Inventory = "INVENTORY"
}

export enum NavItemJournalBatch {
  FarmApp = "FARMAPP"
}

export enum NavJobJournalTemplate {
  Job = "JOB",
  Asset = "ASSETS"
}

export enum NavJobJournalBatch {
  FarrowBackend = "FARROW-BE",
  FarmApp = "FARMAPP"
}

export enum NavReasonCode {
  NaturalDeath = "DEAD-NAT",
  Euthanized = "DEAD-EUTH",
  GradeOffLame = "GRLAME",
  GradeOffRespitory = "GRRESP",
  GradeOffBellyRupture = "GRBRUPT",
  GradeOffScrotumRupture = "GRSRUPT",
  GradeOffScours = "GRSCOURS",
  GradeOffSmall = "GRSMALL",
  GradeOffUnthrifty = "GRUNTHRIFT"
}

export enum WorkTypeCode {
  FarrowBackend = "FARROW-BE"
}

export enum NavEntryType {
  Positive = "Positive Adjmt.",
  Negative = "Negative Adjmt."
}

export enum NavTableID {
  Job = 167
}

export enum JobTaskNumber {
  SowCare = "SOW CARE",
  PigletCare = "PIGLET CARE",
  SowFeed = "SOW FEED",
  Water = "WATER",
  Crate = "CRATE",
  GeneralRoom = "GEN ROOM"
}

export enum AutoPostEnum {
  AutoPost = "FARMAUTO"
}
