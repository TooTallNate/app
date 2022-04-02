import {
  NavItemJournalTemplate,
  NavItemJournalBatch,
  NavEntryType,
  NavReasonCode
} from "./enum";

export interface NavJobPostingGroup {
  Code: string;
  Description: string;
}

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
  Job_Posting_Group: string;
  Project_Manager: string;
}

export interface NavReason {
  Code: string;
  Description: string;
}

export interface NavItem {
  No: string;
  Description: string;
  Gen_Prod_Posting_Group: string;
  Last_Direct_Cost: number;
  Base_Unit_of_Measure: string;
}

export interface NavLocation {
  Code: string;
  Name: string;
}

export interface NavResource {
  No: string;
  Name: string;
  Unit_Price: number;
}

export interface NavItemJournalLine {
  Journal_Template_Name: NavItemJournalTemplate;
  Journal_Batch_Name: NavItemJournalBatch;
  Posting_Date: string;
  Document_Date: string;
  Entry_Type: NavEntryType;
  Document_No: string;
  Item_No: string;
  Description: string;
  Shortcut_Dimension_1_Code: string;
  Shortcut_Dimension_2_Code: string;
  ShortcutDimCode_x005B_5_x005D_: string;
  Location_Code: string;
  Gen_Prod_Posting_Group: string;
  Quantity: number;
  Unit_Amount: number;
  Amount: number;
  Unit_Cost: number;
  Reason_Code: NavReasonCode;
  Weight: number;
  Meta: number;
  Job_No: string;
}

export interface NavJobJournalLine {
  Journal_Template_Name: string;
  Journal_Batch_Name: string;
  Type: string;
  Posting_Date: string;
  Document_Date: string;
  Document_No: string;
  Job_No: string;
  Job_Task_No: string;
  Description: string;
  Location_Code: string;
  Quantity: number;
  No: string;
  Work_Type_Code: string;
  Unit_Cost: number;
  Reason_Code: string;
}

export interface NavStandardItemJournal {
  Journal_Template_Name: string;
  Code: string;
  Description: string;
}

export interface NavJobTask {
  Job_No: string;
  Job_Task_No: string;
  Description: string;
  Job_Task_Type: string;
  WIP_Total: number;
  Totaling: number;
  Job_Posting_Group: string;
}

export interface ItemJournalTemplateObject {
  Name: string;
  Description: string;
  Type: string;
  Source_Code: string;
  Reason_Code: string;
}

export interface NavFuelAsset {
  No: string;
  Dimension_Code: string;
  Dimension_Value_Code: string;
  Item_Description: string;
  Last_Direct_Cost: number;
  FA_No: string;
  FA_Description: string;
  FA_Class_Code: string;
  FA_Subclass_Code: string;
  Global_Dimension_1_Code: string;
  Global_Dimension_2_Code: string;
  Location_Code: string;
  Image: string;
  Unit_of_Measure_Code: string;
  AuxiliaryIndex1: number;
  AuxiliaryIndex2: string;
}

export interface NavFuelHistoryAsset {
  Entry_No: number;
  FA_No: string;
  Amount: number;
  Maintenance_Code: string;
  Reason_Code: string;
  Posting_Date: string;
  Quantity: number;
  Description: string;
  Meta: number;
}

export interface NavFuelMaintenanceJournalLine {
  Journal_Template_Name: string;
  Journal_Batch_Name: string;
  Document_No: string;
  Posting_Date: string;
  Account_Type: string;
  Account_No: string;
  FA_Posting_Type: string;
  Maintenance_Code: string;
  Bal_Account_No: string;
  Shortcut_Dimension_1_Code: string;
  Shortcut_Dimension_2_Code: string;
  Quantity: number;
  Meta: number;
  Amount: number;
  Description: string;
}

export interface NavMaintenanceExpense {
  Code: string;
  Description: string;
  Maintenance_Expense_Account: string;
}

export interface NavMaintenanceAsset {
  Maintenance_Code: string;
  Fixed_Asset_No: string;
  MaintenanceInterval: number;
  Unit_of_Measure_Code: string;
  MaintenanceDescription: string;
  Maintenance_Expense_Account: string;
  No: string;
  FADescription: string;
  FA_Class_Code: string;
  FA_Subclass_Code: string;
  Global_Dimension_1_Code: string;
  Global_Dimension_2_Code: string;
  Location_Code: string;
  AuxiliaryIndex1: string;
  AuxiliaryIndex2: string;
}

export interface NavMaintenanceHistoryAsset {
  Entry_No: number;
  FA_No: string;
  Amount: number;
  Pay_to_Name: string;
  Maintenance_Code: string;
  Reason_Code: string;
  Posting_Date: string;
  Quantity: number;
  Description: string;
  Meta: number;
  CodeDescription: string;
  AuxiliaryIndex1: string;
  AuxiliaryIndex2: string;
}

export interface NavMenuOption {
  Name: string;
  Route: string;
}

export interface NavDimensionPacker {
  Code: string;
  DimensionCode: string;
  DimensionName: string;
}

export interface JobJournalTemplateObject {
  Name: string;
  Description: string;
  Source_Code: string;
  Reason_Code: string;
}
