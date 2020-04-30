import {
  NavDimensionCode,
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType
} from "./enum";

export interface NavUser {
  Full_Name: string;
  License_Type: string;
  User_Name: string;
  User_Security_ID: string;
}

export interface NavJob {
  No: string;
  Description: string;
  Person_Responsible: string;
  Barn_Type: string;
  Site: string;
  Entity: string;
  Cost_Center: string;
  Inventory_Left: number;
  Dead_Quantity: number;
  Start_Quantity: number;
  Start_Weight: number;
  Start_Date: string;
}

export interface NavDimension {
  Dimension_Code: NavDimensionCode;
  Dimension_Value_Code: any;
}

export interface NavResource {
  No: string;
  Name: string;
}

export interface NavItemJournalEntry {
  Journal_Template_Name: NavItemJournalTemplate;
  Journal_Batch_Name: NavItemJournalBatch;
  Line_No: number;
  Posting_Date: string;
  Document_Date: string;
  Entry_Type: NavEntryType;
  Document_No: string;
  External_Document_No: string;
  Item_No: string;
  Variant_Code: string;
  Description: string;
  Shortcut_Dimension_1_Code: string;
  Shortcut_Dimension_2_Code: string;
  ShortcutDimCode_x005B_3_x005D_: string;
  ShortcutDimCode_x005B_4_x005D_: string;
  ShortcutDimCode_x005B_5_x005D_: string;
  ShortcutDimCode_x005B_6_x005D_: string;
  ShortcutDimCode_x005B_7_x005D_: string;
  ShortcutDimCode_x005B_8_x005D_: string;
  Location_Code: string;
  Bin_Code: string;
  Salespers_Purch_Code: string;
  Gen_Bus_Posting_Group: string;
  Gen_Prod_Posting_Group: string;
  Quantity: number;
  Unit_of_Measure_Code: string;
  Unit_Amount: number;
  Amount: number;
  Discount_Amount: number;
  Indirect_Cost_Percent: number;
  Unit_Cost: number;
  Applies_to_Entry: number;
  Applies_from_Entry: number;
  Transaction_Type: string;
  Transport_Method: string;
  Country_Region_Code: string;
  Reason_Code: string;
  Weight: number;
  Meta: number;
  Job_No: string;
  Acres: number;
  ItemDescription: string;
}

export interface NavJobJournalEntry {
  Journal_Template_Name: string;
  Journal_Batch_Name: string;
  Line_No: number;
  Line_Type: string;
  Posting_Date: string;
  Document_Date: string;
  Document_No: string;
  External_Document_No: string;
  Job_No: string;
  Job_Task_No: string;
  Type: string;
  No: string;
  Description: string;
  Job_Planning_Line_No: number;
  Gen_Bus_Posting_Group: string;
  Gen_Prod_Posting_Group: string;
  Variant_Code: string;
  Shortcut_Dimension_1_Code: string;
  Shortcut_Dimension_2_Code: string;
  ShortcutDimCode_x005B_3_x005D_: string;
  ShortcutDimCode_x005B_4_x005D_: string;
  ShortcutDimCode_x005B_5_x005D_: string;
  ShortcutDimCode_x005B_6_x005D_: string;
  ShortcutDimCode_x005B_7_x005D_: string;
  ShortcutDimCode_x005B_8_x005D_: string;
  Location_Code: string;
  Bin_Code: string;
  Work_Type_Code: string;
  Currency_Code: string;
  Unit_of_Measure_Code: string;
  Quantity: number;
  Remaining_Qty: number;
  Direct_Unit_Cost_LCY: number;
  Unit_Cost: number;
  Unit_Cost_LCY: number;
  Total_Cost: number;
  Total_Cost_LCY: number;
  Unit_Price: number;
  Unit_Price_LCY: number;
  Line_Amount: number;
  Line_Amount_LCY: number;
  Line_Discount_Amount: number;
  Line_Discount_Percent: number;
  Total_Price: number;
  Total_Price_LCY: number;
  Applies_to_Entry: number;
  Applies_from_Entry: number;
  Country_Region_Code: string;
  Transaction_Type: string;
  Transport_Method: string;
  Time_Sheet_No: string;
  Time_Sheet_Line_No: number;
  Time_Sheet_Date: string;
  Reason_Code: string;
  JobDescription: string;
  AccName: string;
}
