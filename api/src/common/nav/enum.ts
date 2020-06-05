export enum NavItemJournalTemplate {
  Mortality = "MORTALITY",
  Adjustment = "QTY ADJ",
  GradeOff = "GRADE OFF",
  Move = "MOVE",
  Wean = "WEAN"
}

export enum NavItemJournalBatch {
  FarmApp = "FARMAPP"
}

export enum NavJobJournalTemplate {
  Job = "JOB"
}

export enum NavJobJournalBatch {
  FarrowBackend = "FARROW-BE"
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
