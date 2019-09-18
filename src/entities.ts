export enum Animal {
  MARKET_PIGS = "01",
  GDU_PIGS = "02",
  SOWS = "03"
}

export enum ItemTemplate {
  Mortality = "MORTALITY"
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
}

export interface Job {
  number: string;
}

export interface ItemEntry {
  template: ItemTemplate;
  entryType: EntryType;
  animal: Animal;
  job: string;
}
