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

export interface NavDimensionsSeach extends NavSearch {
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

export interface NavJournalEntry {
  Journal_Template_Name?: string;
  Journal_Batch_Name?: string;
  Line_No?: number;
  Posting_Date?: string;
  Document_Date?: string;
  Document_No?: string;
  External_Document_No?: string;
  Description?: string;
  Job_No?: string;
  Gen_Bus_Posting_Group?: string;
  Gen_Prod_Posting_Group?: string;
  Shortcut_Dimension_1_Code?: string;
  Shortcut_Dimension_2_Code?: string;
  ShortcutDimCode_x005B_3_x005D_?: string;
  ShortcutDimCode_x005B_4_x005D_?: string;
  ShortcutDimCode_x005B_5_x005D_?: string;
  ShortcutDimCode_x005B_6_x005D_?: string;
  ShortcutDimCode_x005B_7_x005D_?: string;
  ShortcutDimCode_x005B_8_x005D_?: string;
  Location_Code?: string;
  Bin_Code?: string;
  Quantity?: number;
  Unit_of_Measure_Code?: string;
  Applies_to_Entry?: number;
  Applies_from_Entry?: number;
  Reason_Code?: string;
  Country_Region_Code?: string;
  Transaction_Type?: string;
  Transport_Method?: string;
  Unit_Cost?: number;
}

export interface NavItemJournalEntry extends NavJournalEntry {
  Entry_Type?: string;
  Item_No?: string;
  Variant_Code?: string;
  Salespers_Purch_Code?: string;
  Unit_Amount?: number;
  Amount?: number;
  Discount_Amount?: number;
  Indirect_Cost_Percent?: number;
  Weight?: number;
  Acres?: number;
  ItemDescription?: string;
}

export interface NavJobJournalEntry extends NavJournalEntry {
  Line_Type?: string;
  Job_Task_No?: string;
  Type?: string;
  No?: string;
  Job_Planning_Line_No?: number;
  Variant_Code?: string;
  Work_Type_Code?: string;
  Currency_Code?: string;
  Remaining_Qty?: number;
  Direct_Unit_Cost_LCY?: number;
  Unit_Cost_LCY?: number;
  Total_Cost?: number;
  Total_Cost_LCY?: number;
  Unit_Price?: number;
  Unit_Price_LCY?: number;
  Line_Amount?: number;
  Line_Amount_LCY?: number;
  Line_Discount_Amount?: number;
  Line_Discount_Percent?: number;
  Total_Price?: number;
  Total_Price_LCY?: number;
  Time_Sheet_No?: string;
  Time_Sheet_Line_No?: number;
  Time_Sheet_Date?: string;
  JobDescription?: string;
  AccName?: string;
}
