import React from "react";
import faker from "faker";
import { MockedResponse, MockedProvider } from "@apollo/react-testing";
import { renderHook, act } from "@testing-library/react-hooks";
import useDefaults, { DefaultValues } from "./defaults";
import {
  DefaultsDocument,
  Job,
  JobsDocument,
  UpdateDefaultsDocument
} from "../graphql";

function render(mocks: MockedResponse[]) {
  const wrapper = ({ children }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
  return renderHook(useDefaults, {
    wrapper
  });
}

function initTestData(): {
  pigJobs: Job[];
  scorecardJobs: Job[];
  defaults: DefaultValues;
  mocks: MockedResponse[];
} {
  const pigJobs = Array.from({ length: 5 }, () => ({
    number: faker.random.alphaNumeric(8),
    site: faker.random.alphaNumeric(2),
    dimensions: {
      costCenter: faker.random.number({ min: 100, max: 999 }).toString(),
      entity: faker.random.number({ min: 1, max: 3 }).toString()
    }
  }));
  const scorecardJobs = Array.from({ length: 5 }, () => ({
    number: faker.random.alphaNumeric(8),
    site: faker.random.alphaNumeric(2),
    dimensions: {
      costCenter: faker.random.number({ min: 100, max: 999 }).toString(),
      entity: faker.random.number({ min: 1, max: 3 }).toString()
    }
  }));

  const defaultPigJob = pigJobs[0];
  const defaultScorecardJob = scorecardJobs[0];
  const defaultPrice = faker.random.number({ min: 1, max: 100 });

  const mocks = [
    {
      request: { query: DefaultsDocument },
      result: {
        data: {
          defaults: {
            pigJob: defaultPigJob.number,
            scorecardJob: defaultScorecardJob.number,
            price: defaultPrice
          }
        }
      }
    },
    {
      request: {
        query: JobsDocument,
        variables: {
          input: {
            status: ["Open"],
            postingGroup: ["MKT PIGS", "SOW", "GDU"]
          }
        }
      },
      result: {
        data: {
          jobs: pigJobs
        }
      }
    },
    {
      request: {
        query: JobsDocument,
        variables: {
          input: {
            status: ["Open"],
            postingGroup: ["FARROW-BE"]
          }
        }
      },
      result: {
        data: {
          jobs: scorecardJobs
        }
      }
    }
  ];

  return {
    pigJobs,
    scorecardJobs,
    defaults: {
      pigJob: defaultPigJob,
      scorecardJob: defaultScorecardJob,
      price: defaultPrice
    },
    mocks
  };
}

test("returns defaults", async () => {
  const { defaults, mocks } = initTestData();
  const { result, waitForNextUpdate } = render(mocks);
  await waitForNextUpdate();
  expect(result.current).toEqual([
    { defaults, loading: false },
    expect.any(Function)
  ]);
});

test("updates defaults", async () => {
  const { pigJobs, scorecardJobs, mocks } = initTestData();
  const input = {
    pigJob: pigJobs[1],
    scorecardJob: scorecardJobs[1],
    price: faker.random.number({ min: 1, max: 100 })
  };
  mocks.push({
    request: {
      query: UpdateDefaultsDocument,
      variables: {
        input: {
          pigJob: input.pigJob.number,
          scorecardJob: input.scorecardJob.number,
          price: input.price
        }
      }
    },
    result: {
      data: {
        updateDefaults: {
          pigJob: input.pigJob.number,
          scorecardJob: input.scorecardJob.number,
          price: input.price
        }
      }
    }
  });
  const { result, waitForNextUpdate } = render(mocks);
  await waitForNextUpdate();
  await act(() => result.current[1](input));
  expect(result.current).toEqual([
    {
      defaults: input,
      loading: false
    },
    expect.any(Function)
  ]);
});

test("update reference is preserved", async () => {
  const { defaults, mocks } = initTestData();
  const newPrice = faker.random.number({ min: 1, max: 100 });
  mocks.push({
    request: {
      query: UpdateDefaultsDocument,
      variables: {
        input: { price: newPrice }
      }
    },
    result: {
      data: {
        updateDefaults: {
          ...defaults,
          price: newPrice
        }
      }
    }
  });
  const { result, waitForNextUpdate } = render(mocks);
  await waitForNextUpdate();
  const [, update1] = result.current;
  await act(() => update1({ price: newPrice }));
  const [, update2] = result.current;
  expect(update1).toBe(update2);
});

test("returns loading state", async () => {
  const { result, waitForNextUpdate } = render([]);
  expect(result.current).toEqual([
    {
      defaults: {
        pigJob: undefined,
        scorecardJob: undefined,
        price: undefined
      },
      loading: true
    },
    expect.any(Function)
  ]);
  await waitForNextUpdate();
  expect(result.current).toEqual([
    {
      defaults: {
        pigJob: undefined,
        scorecardJob: undefined,
        price: undefined
      },
      loading: false
    },
    expect.any(Function)
  ]);
});
