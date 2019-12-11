import { expectUnauthorized, login, navMock } from "../test/utils";
import { postJobMutation } from "../test/gql";

const validInput = {
  template: "JOB",
  batch: "FARROW-BE",
  date: new Date(2019, 9, 17),
  document: "DOC-1234",
  location: "45",
  job: "1901F",
  task: "SOW CARE",
  number: "QUAD 3 - 9",
  workType: "FARROW-BE",
  quantity: 2,
  unitPrice: 1.667,
  description: "operator comments"
};

describe("post job journal mutation", () => {
  test("returns error if not logged in", () =>
    expectUnauthorized(() =>
      postJobMutation({
        input: validInput
      })
    ));

  test("return `true` if posting succeeds", async () => {
    await login();
    const { errors, data } = await postJobMutation({
      input: validInput
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      postJobJournal: true
    });
    expect(navMock.postJob).toHaveBeenCalledWith({
      Journal_Batch_Name: "FARROW-BE",
      Journal_Template_Name: "JOB",
      Posting_Date: "2019-10-17",
      Document_Date: "2019-10-17",
      Document_No: "DOC-1234",
      Job_No: "1901F",
      Location_Code: "45",
      Job_Task_No: "SOW CARE",
      No: "QUAD 3 - 9",
      Work_Type_Code: "FARROW-BE",
      Quantity: 2,
      Unit_Price: 1.667,
      Description: "operator comments"
    });
  });

  test("returns error if posting fails", async () => {
    navMock.postJob.mockRejectedValue(new Error("error message"));
    await login();
    const { errors } = await postJobMutation({
      input: validInput
    });
    expect(errors).toEqual([
      expect.objectContaining({
        message: "error message"
      })
    ]);
  });
});
