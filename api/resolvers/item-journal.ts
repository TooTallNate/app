import { MutationResolvers } from "./types";
import nav from "../nav";

export const ItemJournalMutation: MutationResolvers = {
  async postItemEntry(_, { input }, { user }) {
    const date = new Date(input.date);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    const dateString = `${date.getFullYear()}-${month}-${day}`;
    const item = await nav.postItemEntry(
      {
        Journal_Template_Name: input.template,
        Journal_Batch_Name: input.batch,
        Posting_Date: dateString,
        Document_Date: dateString,
        Entry_Type: input.entryType,
        Document_No: input.document,
        Item_No: input.item,
        Description: input.description,
        Location_Code: input.location,
        Quantity: input.quantity,
        Unit_Amount: input.amount,
        Weight: input.weight,
        Job_No: input.job
      },
      user
    );
    if (item) {
      return true;
    } else {
      throw new Error("Failed to post item.");
    }
  }
};
