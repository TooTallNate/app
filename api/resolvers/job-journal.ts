import { MutationResolvers } from "./types";

export const JobJournalMutation: MutationResolvers = {
  async postJobJournal(_, { input }, { navClient }) {
    const date = new Date(input.date);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    const dateString = `${date.getFullYear()}-${month}-${day}`;
    await navClient.postJob({
      Journal_Template_Name: input.template,
      Journal_Batch_Name: input.batch,
      Posting_Date: dateString,
      Document_Date: dateString,
      Document_No: input.document,
      Job_No: input.job,
      Location_Code: input.location,
      Job_Task_No: input.task,
      No: input.number,
      Work_Type_Code: input.workType,
      Quantity: input.quantity,
      Unit_Price: input.unitPrice,
      Description: input.description
    });
    return true;
  }
};
