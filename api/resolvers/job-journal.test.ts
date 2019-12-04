import { expectUnauthorized, login, navMock } from "../test/utils";
import { postJobMutation } from "../test/gql";

describe("post job journal mutation", () => {
  test("returns error if not logged in", () =>
    expectUnauthorized(() =>
      postJobMutation({
        input: {
          template: "",
          batch: "",
          date: new Date(),
          document: "",
          description: "",
          location: "",
          quantity: 0,
          amount: 0,
          job: ""
        }
      })
    ));

  test("return `true` if posting succeeds", async () => {
    await login();
    const { errors, data } = await postJobMutation({
      input: {
        template: "QTY ADJ",
        batch: "DEFAULT",
        date: new Date(2019, 9, 17),
        document: "DOC-1234",
        description: "comments from operator",
        location: "45",
        quantity: 2,
        amount: 45.5,
        job: "1901F"
      }
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      postJobJournal: true
    });
    expect(navMock.postJob).toHaveBeenCalledWith({
      Journal_Template_Name: "QTY ADJ",
      Journal_Batch_Name: "DEFAULT",
      Posting_Date: "2019-10-17",
      Document_Date: "2019-10-17",
      Document_No: "DOC-1234",
      Description: "comments from operator",
      Location_Code: "45",
      Quantity: 2,
      Unit_Amount: 45.5,
      Job_No: "1901F"
    });
  });

  test("returns error if posting fails", async () => {
    navMock.postJob.mockRejectedValue(new Error("error message"));
    await login();
    const { errors } = await postJobMutation({
      input: {
        template: "QTY ADJ",
        batch: "DEFAULT",
        date: new Date(2019, 9, 17),
        document: "DOC-1234",
        description: "comments from operator",
        location: "45",
        quantity: 2,
        amount: 45.5,
        job: "1901F"
      }
    });
    expect(errors).toEqual([
      expect.objectContaining({
        message: "error message"
      })
    ]);
  });
});
