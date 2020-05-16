import { client, testUnauthenticated, mockUser } from "../../test/utils";
import {
  QueryFarrowingBackendScorecardArgs,
  ScorecardEntry,
  FarrowingBackendScorecard
} from "../../common/graphql";
import {
  FarrowingBackendScorecardFactory,
  JobFactory,
  ResourceFactory
} from "../../test/builders";
import FarrowingBackendScorecardModel, {
  FarrowingBackendScorecardDocument
} from "../models/FarrowingBackendScorecard";
import { NavResource, NavJob } from "../../common/nav";
import faker from "faker";
import nock from "nock";

interface QueryResult {
  farrowingBackendScorecard: FarrowingBackendScorecard;
}

function query(variables: QueryFarrowingBackendScorecardArgs) {
  return client.request<QueryResult>(
    `query FarrowingBackendScorecard($area: String!) {
      farrowingBackendScorecard(area: $area) {
        area {
          number
          description
        }
        operator {
          number
          name
        }
        sows {
          score
          comments
        }
        piglets {
          score
          comments
        }
        feed {
          score
          comments
        }
        water {
          score
          comments
        }
        crate {
          score
          comments
        }
        room {
          score
          comments
        }
      }
    }`,
    variables
  );
}

testUnauthenticated(() => query({ area: faker.random.word() }), {
  farrowingBackendScorecard: null
});

function mapEntry(entry: ScorecardEntry) {
  return {
    score: typeof entry.score === "number" ? entry.score : null,
    comments: entry.comments ? entry.comments : null
  };
}

function mapScorecard(
  scorecard: FarrowingBackendScorecardDocument,
  area: NavJob,
  operator?: NavResource
) {
  return {
    area: {
      number: area.No,
      description: area.Description
    },
    operator: operator
      ? {
          number: operator.No,
          name: operator.Name
        }
      : null,
    sows: mapEntry(scorecard.sows),
    piglets: mapEntry(scorecard.piglets),
    feed: mapEntry(scorecard.feed),
    water: mapEntry(scorecard.water),
    crate: mapEntry(scorecard.crate),
    room: mapEntry(scorecard.room)
  };
}

test("returns empty scorecard if no scorecard is saved", async () => {
  const { auth } = await mockUser();

  const area = JobFactory.build();
  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${area.No}%27)`)
    .basicAuth(auth)
    .reply(200, area);

  await expect(query({ area: area.No })).resolves.toEqual({
    farrowingBackendScorecard: mapScorecard(
      new FarrowingBackendScorecardModel({ area: area.No }),
      area
    )
  });
});

test("returns scorecard", async () => {
  const { auth } = await mockUser();

  const area = JobFactory.build();
  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${area.No}%27)`)
    .basicAuth(auth)
    .reply(200, area);

  const operator = ResourceFactory.build();
  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Resources(%27${operator.No}%27)`
    )
    .basicAuth(auth)
    .reply(200, operator);

  const scorecard = await FarrowingBackendScorecardModel.create(
    FarrowingBackendScorecardFactory.build({
      area: area.No,
      operator: operator.No
    })
  );

  await expect(query({ area: scorecard.area })).resolves.toEqual({
    farrowingBackendScorecard: mapScorecard(scorecard, area, operator)
  });
});

test("returns scorecard without operator", async () => {
  const { auth } = await mockUser();

  const area = JobFactory.build();
  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${area.No}%27)`)
    .basicAuth(auth)
    .reply(200, area);

  const scorecard = await FarrowingBackendScorecardModel.create(
    FarrowingBackendScorecardFactory.build({
      area: area.No,
      operator: undefined
    })
  );

  await expect(query({ area: scorecard.area })).resolves.toEqual({
    farrowingBackendScorecard: mapScorecard(scorecard, area)
  });
});

test("returns scorecard without scores", async () => {
  const { auth } = await mockUser();

  const area = JobFactory.build();
  nock(process.env.NAV_BASE_URL)
    .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${area.No}%27)`)
    .basicAuth(auth)
    .reply(200, area);

  const operator = ResourceFactory.build();
  nock(process.env.NAV_BASE_URL)
    .get(
      `/Company(%27${process.env.NAV_COMPANY}%27)/Resources(%27${operator.No}%27)`
    )
    .basicAuth(auth)
    .reply(200, operator);

  const scorecard = await FarrowingBackendScorecardModel.create(
    FarrowingBackendScorecardFactory.build({
      area: area.No,
      operator: operator.No,
      sows: undefined,
      piglets: undefined,
      feed: undefined,
      water: undefined,
      crate: undefined,
      room: undefined
    })
  );

  await expect(query({ area: scorecard.area })).resolves.toEqual({
    farrowingBackendScorecard: mapScorecard(scorecard, area, operator)
  });
});
