export enum Animal {
  MARKET_PIGS = "01",
  GDU_PIGS = "02",
  SOWS = "03"
}

export enum ItemTemplate {
  Mortality = "MORTALITY",
  Adjustment = "QTY ADJ",
  GradeOff = "GRADE OFF",
  Move = "MOVE",
  Wean = "WEAN"
}

export enum ItemBatch {
  Mortality = "MORTALITY",
  Move = "MOVE",
  Wean = "WEAN PIGS",
  Default = "DEFAULT"
}

export enum EntryType {
  Positive = "Positive Adjmt.",
  Negative = "Negative Adjmt."
}

export enum License {
  Full = "Full License",
  Limited = "Limited License"
}

export interface User {
  fullName: string;
  license: License;
  username: string;
}

export interface Job {
  number: string;
  location: string;
}

export interface ItemEntry {
  template: ItemTemplate;
  batch: ItemBatch;
  entryType: EntryType;
  animal: Animal;
  job: Job;
  quantity: number;
  weight: number;
  document: string;
}
