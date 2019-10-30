export interface NavCredentials {
  username: string;
  password: string;
}

export interface NavUser {
  User_Security_ID: string;
  License_Type: string;
  Full_Name: string;
}

export interface NavJobSearch {
  Status?: string[];
  Job_Posting_Group?: string[];
}

export interface NavJob {
  No: string;
  Site: string;
  Status: string;
  Job_Posting_Group: string;
}

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
