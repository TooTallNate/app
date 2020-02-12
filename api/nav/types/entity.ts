import {
  NavTableID,
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
  Description_2: string;
  Bill_to_Customer_No: string;
  Bill_to_Contact_No: string;
  Bill_to_Name: string;
  Bill_to_Address: string;
  Bill_to_Address_2: string;
  Bill_to_City: string;
  Bill_to_County: string;
  Bill_to_Post_Code: string;
  Bill_to_Country_Region_Code: string;
  Bill_to_Contact: string;
  Search_Description: string;
  Person_Responsible: string;
  Blocked: string;
  Last_Date_Modified: string;
  Project_Manager: string;
  Barn_Code: string;
  Status: string;
  Job_Posting_Group: string;
  Starting_Date: string;
  Ending_Date: string;
  Land_Code: string;
  WIP_Method: string;
  WIP_Posting_Method: string;
  Allow_Schedule_Contract_Lines: true;
  Apply_Usage_Link: false;
  Percent_Completed: number;
  Percent_Invoiced: number;
  Percent_of_Overdue_Planning_Lines: number;
  Creation_Date: string;
  Currency_Code: string;
  Invoice_Currency_Code: string;
  Exch_Calculation_Cost: string;
  Exch_Calculation_Price: string;
  WIP_Posting_Date: string;
  Total_WIP_Sales_Amount: number;
  Applied_Sales_G_L_Amount: number;
  Total_WIP_Cost_Amount: number;
  Applied_Costs_G_L_Amount: number;
  Recog_Sales_Amount: number;
  Recog_Costs_Amount: number;
  Recog_Profit_Amount: number;
  Recog_Profit_Percent: number;
  Acc_WIP_Costs_Amount: number;
  Acc_WIP_Sales_Amount: number;
  Calc_Recog_Sales_Amount: number;
  Calc_Recog_Costs_Amount: number;
  WIP_G_L_Posting_Date: string;
  Total_WIP_Sales_G_L_Amount: number;
  Total_WIP_Cost_G_L_Amount: number;
  Recog_Sales_G_L_Amount: number;
  Recog_Costs_G_L_Amount: number;
  Recog_Profit_G_L_Amount: number;
  Recog_Profit_G_L_Percent: number;
  Calc_Recog_Sales_G_L_Amount: number;
  Calc_Recog_Costs_G_L_Amount: number;
  System: string;
  Grower: string;
  Site: string;
  Pig_Source_Flow: string;
  Organization: string;
  Barn_Type: string;
  Barn_Description: string;
  Building_Style: string;
  Capacity: number;
  Total_Square_Footage: number;
  Usable_Square_Footage: number;
  Rooms_Building: number;
  Pens_Room: number;
  Feeder_Type: string;
  Pigs_Feeder_Hole: number;
  Autosort: string;
  Water_Type: string;
  Pigs_Water_Source: string;
  Heat_Source: string;
  Cooling: string;
  Ventilation: string;
  Flooring: string;
  Waste_Handling: string;
  Market_Target_Weight: number;
  Landlord_Count: number;
  Land_Description: string;
  Land_Legal_Description: string;
  Land_Total_Acres: number;
  Land_Tillable_Acres: number;
  Land_Percent_Tiled: number;
  Land_Percent_Irrigated: number;
}

export interface NavDimension {
  Table_ID: NavTableID;
  No: string;
  Dimension_Code: NavDimensionCode;
  Dimension_Value_Code: any;
  Value_Posting: string;
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
