export interface NavCredentials {
  username: string;
  lmPassword: Buffer;
  ntPassword: Buffer;
}

export interface NavSearch {
  [prop: string]: any[];
}

export interface NavUser {
  User_Security_ID: string;
  License_Type: string;
  Full_Name: string;
}

export interface NavJobSearch extends NavSearch {
  Status?: string[];
  Job_Posting_Group?: string[];
}

export interface NavDimensionSearch extends NavSearch {
  Table_ID?: number[];
  No?: string[];
}

export interface NavJob {
  No: string;
  Site: string;
  Status: string;
  Job_Posting_Group: string;
}

export interface NavDimension {
  Table_ID: number;
  No: string;
  Dimension_Code: string;
  Dimension_Value_Code: string;
  Value_Posting: string;
}

export type NavDimensions = NavDimension[];

export interface NewNavItemEntry {
  Journal_Template_Name: string;
  Journal_Batch_Name: string;
  Posting_Date: string;
  Document_Date: string;
  Entry_Type: string;
  Document_No: string;
  Item_No: string;
  Description?: string;
  Location_Code: string;
  Quantity: number;
  Unit_Amount: number;
  Weight: number;
  Job_No: string;
  Gen_Prod_Posting_Group?: string;
  Shortcut_Dimension_1_Code?: string;
  Shortcut_Dimension_2_Code?: string;
}

export interface NavItemEntry extends NewNavItemEntry {
  Line_No: number;
  Amount: number;
  Unit_Cost: number;
  Reason_Code: string;
}