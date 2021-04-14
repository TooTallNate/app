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
  Location_Code: string;
  Gen_Prod_Posting_Group: string;
  Quantity: number;
  Unit_Amount: number;
  Unit_Cost: number;
  Reason_Code: NavReasonCode;
  Weight: number;
  Meta: number;
  Job_No: string;
}

export interface NavJobJournalLine {
  Journal_Template_Name: string;
  Journal_Batch_Name: string;
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
