import { client, testUnauthenticated, mockUser } from "../utils";
import {
  ScorecardEntry,
  FarrowingBackendScorecard
} from "../../resolvers/types";
import {
  FarrowingBackendScorecardFactory,
  JobFactory,
  ResourceFactory
} from "../builders";
import FarrowingBackendScorecardModel, {
  FarrowingBackendScorecardDocument
} from "../../models/farrowing-backend-scorecard";
import nock from "nock";

interface QueryResult {
  farrowingBackendScorecards: FarrowingBackendScorecard[];
}

function query() {
  return client.request<QueryResult>(`
    {
      farrowingBackendScorecards {
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
    }
  `);
}

testUnauthenticated(query);

test("returns list of scorecards", async () => {
  const { auth } = await mockUser();

  const areas = JobFactory.buildList(3);
  areas.forEach(area =>
    nock(process.env.NAV_BASE_URL)
      .get(`/Company(%27${process.env.NAV_COMPANY}%27)/Jobs(%27${area.No}%27)`)
      .basicAuth(auth)
      .reply(200, area)
  );

  const operators = ResourceFactory.buildList(2);
  operators.forEach(operator =>
    nock(process.env.NAV_BASE_URL)
      .get(
        `/Company(%27${process.env.NAV_COMPANY}%27)/Resources(%27${operator.No}%27)`
      )
      .basicAuth(auth)
      .reply(200, operator)
  );

  const scorecards = await FarrowingBackendScorecardModel.insertMany([
    FarrowingBackendScorecardFactory.build({
      area: areas[0].No,
      operator: operators[0].No
    }),
    FarrowingBackendScorecardFactory.build({
      area: areas[1].No,
      operator: operators[1].No,
      sows: undefined,
      piglets: undefined,
      feed: undefined,
      water: undefined,
      crate: undefined,
      room: undefined
    }),
    FarrowingBackendScorecardFactory.build({
      area: areas[2].No,
      operator: undefined
    })
  ]);

  function mapEntry(entry: ScorecardEntry) {
    return {
      score: typeof entry.score === "number" ? entry.score : null,
      comments: entry.comments ? entry.comments : null
    };
  }

  function mapScorecard(scorecard: FarrowingBackendScorecardDocument) {
    const area = areas.find(area => area.No === scorecard.area);
    const operator =
      scorecard.operator &&
      operators.find(operator => operator.No === scorecard.operator);
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

  await expect(query()).resolves.toEqual({
    farrowingBackendScorecards: scorecards.map(mapScorecard)
  });
});
