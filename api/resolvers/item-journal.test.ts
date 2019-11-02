import { expectUnauthorized, login, navMock } from "../test/utils";
import { postItemMutation } from "../test/gql";

describe("post item mutation", () => {
  test("returns error if not logged in", () =>
    expectUnauthorized(() =>
      postItemMutation({
        input: {
          template: "",
          batch: "",
          date: new Date(),
          entryType: "",
          document: "",
          item: "",
          description: "",
          location: "",
          quantity: 0,
          amount: 0,
          weight: 0,
          job: "",
          prodPostingGroup: "MARKET HOGS",
          entityType: "2",
          costCenterCode: "211"
        }
      })
    ));

  test("return `true` if posting succeeds", async () => {
    await login();
    const { errors, data } = await postItemMutation({
      input: {
        template: "QTY ADJ",
        batch: "DEFAULT",
        date: new Date(2019, 9, 17),
        entryType: "Positive Adjmt.",
        document: "DOC-1234",
        item: "01",
        description: "comments from operator",
        location: "45",
        quantity: 2,
        amount: 45.5,
        weight: 90,
        job: "1901F",
        prodPostingGroup: "MARKET HOGS",
        entityType: "2",
        costCenterCode: "211"
      }
    });
    expect(errors).toBeFalsy();
    expect(data).toEqual({
      postItem: true
    });
    expect(navMock.postItem).toHaveBeenCalledWith({
      Journal_Template_Name: "QTY ADJ",
      Journal_Batch_Name: "DEFAULT",
      Posting_Date: "2019-10-17",
      Document_Date: "2019-10-17",
      Entry_Type: "Positive Adjmt.",
      Document_No: "DOC-1234",
      Item_No: "01",
      Description: "comments from operator",
      Location_Code: "45",
      Quantity: 2,
      Unit_Amount: 45.5,
      Weight: 90,
      Job_No: "1901F",
      Gen_Prod_Posting_Group: "MARKET HOGS",
      Shortcut_Dimension_1_Code: "2",
      Shortcut_Dimension_2_Code: "211"
    });
  });

  test("returns error if posting fails", async () => {
    navMock.postItem.mockRejectedValue(new Error("error message"));
    await login();
    const { errors } = await postItemMutation({
      input: {
        template: "QTY ADJ",
        batch: "DEFAULT",
        date: new Date(2019, 9, 17),
        entryType: "Positive Adjmt.",
        document: "DOC-1234",
        item: "01",
        description: "comments from operator",
        location: "45",
        quantity: 2,
        amount: 45.5,
        weight: 90,
        job: "1901F",
        prodPostingGroup: "MARKET HOGS",
        entityType: "2",
        costCenterCode: "211"
      }
    });
    expect(errors).toEqual([
      expect.objectContaining({
        message: "error message"
      })
    ]);
  });
});
