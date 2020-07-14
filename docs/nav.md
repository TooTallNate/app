# Navision

## OData API
[Insomnia Import](./insomnia.json) - Import this into Insomnia to make requests against NAV. You will need to set the username and password in the environment in order for this to work.

### Config
* OData Service Root: `https://{host}:{port}/{instance name}/ODataV4`
* All requests are done through a company: `/Company('{company name}')`

### Routes
* [Users](#users)
* [Items](#items)
* [Locations](#locations)
* [Reason Codes](#reason-codes)
* [Resources](#resources)
* [Jobs](#jobs)
* [Item Journals](#item-journals)
* [Standard Item Journals](#standard-item-journals)
* [Job Journals](#job-journals)

#### Users
Users who have access to NAV.
* Route: `/Users`
* Key: `User_Security_ID`
* Type:
  * User_Security_ID (`string`) - The unique ID of the user.
  * User_Name (`string`) - The username of the user. This is often in the format `DOMAIN\name`
  * Full_Name (`string`)
  * License_Type (`string`) - Either `"Limited User"` or `"Full User"`

#### Items
Items, who's inventory can be tracked like pigs, and medicine.
* Route: `/Items`
* Key: `No`
* Type:
  * No (`string`) - The unique code of the item.
  * Description (`string`) - The human readable description.
  * Gen_Prod_Posting_Group (`string`) - The group the item belongs to.

#### Locations
Barns and fields were users are working.
* Route: `/Locations`
* Key: `Code`
* Type:
  * Code (`string`) - The unique code of the location.
  * Name (`string`) - The human readable description.

#### Reason Codes
Describes the purpose of a transaction in a journal.
* Route: `/ReasonCodes`
* Key: `Code`
* Type:
  * Code (`string`) - The unique code of the reason.
  * Name (`string`) - The human readable description.

#### Resources
People and groups.
* Route: `/Resources`
* Key: `Code`
* Type:
  * Code (`string`) - The unique code of the resource.
  * Name (`string`) - The human readable description.
  * Resource_Group_No (`string`) - The group the person is in.

#### Jobs
Contains inventory and tasks.
* Route `/Jobs`
* Key: `No`
* Type:
  * Job_Posting_Group (`string`) - The group the job belongs to.
  * Status (`string`) - Job status. One of `"Open"` or `"Closed"`
  * No (`string`) - Unique code for the job. `"1937B54"` - Year (2 digits), week (2 digits), location code (rest)
  * Description (`string`) - The human readable description.
  * Person_Responsible (`string -> Resource`) - The code of the resource that is responsible for the job.
  * Barn_Type (`string`) - The barn type of the location. One of `"Nursury"`, `"Finisher"`, or `"Planning"`
  * Site (`string -> Location`) - The location code for the job.
  * Entity (`string`)
  * Cost_Center (`string`)
  * Inventory_Left (`number`) - How many pigs are left in the job.
  * Dead_Quantity (`number`) - How many pigs have died in the job.
  * Start_Quantity (`number`) - How many pigs were in the job at the beginning of the job.
  * Start_Weight (`number`) - The total weight of the pigs at the beginning of the job.
  * Start_Date (`string`) - The date the job started. Format - YYYY-MM-DD

#### Item Journals
Manages transactions for items.
* Route: `/ItemJournal`
* Key: `Journal_Template_Name`, `Journal_Batch_Name`, `Line_No`
* Type:
  * Journal_Template_Name (`string`) - The code of the journal template.
  * Journal_Batch_Name (`string`) - The journal batch. Entries from the app all have the same batch.
  * Line_No (`number`) - The line number in the journal of the entry.
  * Posting_Date (`string`) - The date the entry was created.
  * Document_Date (`string`) - The date of the document related to the entry.
  * Document_No (`string`) - The document number related to the entry. This corresponds to the form on the app. `"WEANADRI200504153013"` - Form code/Username (8 digits), timestamp YYMMDDhhmmss) (12 digits)
  * Entry_Type (`string`) - Whether the entry is a postive or negative inventory adjustment. One of `"Negative Adjmt."` or `"Postive Adjmt."`.
  * Item_No (`string -> Item`) - The item code this entry is modifying.
  * Description (`string`) - Used for comments on the transaction.
  * Job_No (`string -> Job`) - The code of the job this entry is for.
  * Location_Code (`string -> Location`) - The code of the location where the entry occured.
  * Shortcut_Dimension_1_Code (`string`) - Corresponds to the `Entity` on a `Job`.
  * Shortcut_Dimension_2_Code (`string`) - Corresponds to the `Cost_Center` on a `Job`.
  * Gen_Prod_Posting_Group (`string`) - Accounting group for the entry.
  * Quantity (`number`) - The amount of the item being added or subtracted.
  * Unit_Amount (`number`) - The unit accounting price of the item in the entry.
  * Weight (`number`) - The total weight of the items in the entry.
  * Reason_Code (`string -> Reason Code`) - The code of the reason for this entry.
  * Meta (`number`) - Used to record small pigs.

#### Standard Item Journals
Manages standard transactions for items.
* Route: `/StandardItemJournal`
* Key: `Journal_Template_Name`, `Code`, `Line_No`
* Type:
  * Journal_Template_Name (`string`) - The code of the journal template.
  * Code (`string`) - The standard journal code. Identifies a standard journal within a template.
  * Line_No (`number`) - The line number in the journal of the entry.
  * *See Item Journals for the rest of the fields.*

#### Job Journals
Manages transactions for jobs.
* Route: `/JobJournal`
* Key: `Journal_Template_Name`, `Journal_Batch_Name`, `Line_No`
* Type:
  * Journal_Template_Name (`string`) - The code of the journal template.
  * Journal_Batch_Name (`string`) - The journal batch. Entries from the app all have the same batch.
  * Line_No (`number`) - The line number in the journal of the entry.
  * Posting_Date (`string`) - The date the entry was created.
  * Document_Date (`string`) - The date of the document related to the entry.
  * Document_No (`string`) - The document number related to the entry. This corresponds to the form on the app. `"WEANADRI200504153013"` - Form code/Username (8 digits), timestamp YYMMDDhhmmss) (12 digits)
  * Description (`string`) - Used for comments on the transaction.
  * Job_No (`string -> Job`) - The code of the job this entry is for.
  * Location_Code (`string -> Location`) - The code of the location where the entry occured.
  * Quantity (`number`) - The amount in the entry.
  * Job_Task_No (`string`) - The code of the job task this entry applies to.
  * No (`string -> Resource`) - The resource code this entry applies to.
  * Work_Type_Code (`string`) - The type of work this entry is for.