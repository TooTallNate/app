import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  FarrowingBackendScorecardResult,
  MutationSaveFarrowingBackendScorecardArgs
} from "../../common/graphql";
import { SaveFarrowingBackendScorecardInputFactory } from "../../../test/builders";
import FarrowingBackendScorecardModel from "../models/FarrowingBackendScorecard";
import { ObjectId } from "mongodb";

function mutation(variables: MutationSaveFarrowingBackendScorecardArgs) {
  return client.request<FarrowingBackendScorecardResult>(
    `mutation SaveFarrowingBackendScorecard($input: SaveFarrowingBackendScorecardInput!) {
      saveFarrowingBackendScorecard(input: $input) {
        success
      }
    }`,
    variables
  );
}

testUnauthenticated(() =>
  mutation({ input: SaveFarrowingBackendScorecardInputFactory.build() })
);

test("saves scores to existing document", async () => {
  await mockUser();
  const input = SaveFarrowingBackendScorecardInputFactory.build();

  await expect(mutation({ input })).resolves.toEqual({
    saveFarrowingBackendScorecard: {
      success: true
    }
  });

  await expect(
    FarrowingBackendScorecardModel.findOne({
      area: input.area
    }).lean()
  ).resolves.toEqual({
    ...input,
    __v: expect.any(Number),
    _id: expect.any(ObjectId),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  });

  await expect(mutation({ input: { area: input.area } })).resolves.toEqual({
    saveFarrowingBackendScorecard: {
      success: true
    }
  });

  await expect(
    FarrowingBackendScorecardModel.findOne({
      area: input.area
    }).lean()
  ).resolves.toEqual({
    area: input.area,
    __v: expect.any(Number),
    _id: expect.any(ObjectId),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date)
  });
});
