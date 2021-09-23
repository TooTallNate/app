import nock from "nock";
import faker from "faker";
import { client, testUnauthenticated, mockUser } from "../../../test/utils";
import {
  LivestockWeanResult,
  MutationPostLivestockWeanArgs
} from "../../common/graphql";
import {
  LivestockWeanFactory,
  JobFactory,
  UserSettingsFactory
} from "../../../test/builders";
import LivestockWeanModel from "../models/LivestockWean";
import UserSettingsModel from "../../common/models/UserSettings";

function mutation(variables: MutationPostLivestockWeanArgs) {
  return client.request<LivestockWeanResult>(
    `mutation SaveLivestockWean($input: SaveLivestockWeanInput!) {
      saveLivestockWean(input: $input) {
        success
        livestockWean {
          job {
            number
          }
          quantity
          smallLivestockQuantity
          totalWeight
          comments
        }
        defaults { 
          job {
            number
          }
        }
      }
    }`,
    variables
  );
}

async function mockTestData({ input: inputOverrides = {} } = {}) {
  const { user, auth } = await mockUser();
  const job = JobFactory.build();
  const input = LivestockWeanFactory.build({
    job: job.No,
    ...inputOverrides
  });

  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${job.No}%27)`)
    .basicAuth(auth)
    .reply(200, job)
    .persist();

  return { user, job, input };
}

testUnauthenticated(() =>
  mutation({
    input: LivestockWeanFactory.build()
  })
);

test("creates new wean document", async () => {
  const { input, job, user } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockWean: {
      success: true,
      livestockWean: {
        job: {
          number: job.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: null
      }
    }
  });

  await expect(
    LivestockWeanModel.findOne(
      {
        job: job.No
      },
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "wean",
    event: input.event,
    job: job.No,
    quantity: input.quantity,
    smallLivestockQuantity: input.smallLivestockQuantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});

test("updates existing wean document", async () => {
  const { input, job } = await mockTestData({
    input: {
      comments: faker.lorem.words(3)
    }
  });
  const weanDoc = await LivestockWeanModel.create({
    job: job.No
  });

  await expect(mutation({ input })).resolves.toEqual({
    saveLivestockWean: {
      success: true,
      livestockWean: {
        job: {
          number: job.No
        },
        quantity: input.quantity,
        smallLivestockQuantity: input.smallLivestockQuantity,
        totalWeight: input.totalWeight,
        comments: input.comments
      },
      defaults: {
        job: null
      }
    }
  });

  await expect(
    LivestockWeanModel.findById(
      weanDoc._id,
      "-__v -createdAt -updatedAt"
    ).lean()
  ).resolves.toEqual({
    _id: expect.anything(),
    activity: "wean",
    event: input.event,
    job: job.No,
    quantity: input.quantity,
    smallLivestockQuantity: input.smallLivestockQuantity,
    totalWeight: input.totalWeight,
    comments: input.comments
  });
});
