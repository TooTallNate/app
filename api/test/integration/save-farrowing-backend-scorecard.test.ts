import { client, testUnauthenticated, mockUser } from "../utils";
import {
  SaveFarrowingBackendScorecardResult,
  MutationSaveFarrowingBackendScorecardArgs
} from "../../resolvers/types";
import { FarrowingBackendScorecardInputFactory } from "../builders";
import FarrowingBackendScorecardModel from "../../models/farrowing-backend-scorecard";

function mutation(variables: MutationSaveFarrowingBackendScorecardArgs) {
  return client.request<SaveFarrowingBackendScorecardResult>(
    `mutation SaveFarrowingBackendScorecard($input: FarrowingBackendScorecardInput!) {
      saveFarrowingBackendScorecard(input: $input) {
        success
      }
    }`,
    variables
  );
}

testUnauthenticated(() =>
  mutation({ input: FarrowingBackendScorecardInputFactory.build() })
);

test("submits scores to database", async () => {
  await mockUser();
  const input = FarrowingBackendScorecardInputFactory.build();

  await expect(mutation({ input })).resolves.toEqual({
    saveFarrowingBackendScorecard: {
      success: true
    }
  });

  await expect(
    FarrowingBackendScorecardModel.findOne({
      area: input.area
    }).lean()
  ).resolves.toMatchObject({
    ...input
  });
});
