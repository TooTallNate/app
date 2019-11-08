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
  const wrapper: React.FC = ({ children }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
  return renderHook(useDefaults, {
    wrapper
  });
}

function initTestData(): {
  jobs: Job[];
  defaults: DefaultValues;
  mocks: MockedResponse[];
} {
  const jobs = Array.from({ length: 5 }, () => ({
    number: faker.random.alphaNumeric(8),
    site: faker.random.alphaNumeric(2),
    dimensions: {
      costCenter: faker.random.number({ min: 100, max: 999 }).toString(),
      entity: faker.random.number({ min: 1, max: 3 }).toString()
    }
  }));

  const defaultJob = jobs[0];
  const defaultPrice = faker.random.number({ min: 1, max: 100 });

  const mocks = [
    {
      request: { query: DefaultsDocument },
      result: {
        data: {
          defaults: {
            job: defaultJob.number,
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
          jobs
        }
      }
    }
  ];

  return { jobs, defaults: { job: defaultJob, price: defaultPrice }, mocks };
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

test("updates only the default job", async () => {
  const { jobs, defaults, mocks } = initTestData();
  const newJob = jobs[1];
  mocks.push({
    request: {
      query: UpdateDefaultsDocument,
      variables: {
        input: { job: newJob.number }
      }
    },
    result: {
      data: {
        updateDefaults: {
          ...defaults,
          job: newJob.number
        }
      }
    }
  });
  const { result, waitForNextUpdate } = render(mocks);
  await waitForNextUpdate();
  await act(() => result.current[1]({ job: newJob }));
  expect(result.current).toEqual([
    {
      defaults: {
        job: newJob,
        price: defaults.price
      },
      loading: false
    },
    expect.any(Function)
  ]);
});

test("updates only the default price", async () => {
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
          job: defaults.job ? defaults.job.number : null,
          price: newPrice
        }
      }
    }
  });
  const { result, waitForNextUpdate } = render(mocks);
  await waitForNextUpdate();
  await act(() => result.current[1]({ price: newPrice }));
  expect(result.current).toEqual([
    {
      defaults: {
        ...defaults,
        price: newPrice
      },
      loading: false
    },
    expect.any(Function)
  ]);
});

test("update reference is preserved", async () => {
  const { jobs, defaults, mocks } = initTestData();
  const newJob = jobs[1];
  mocks.push({
    request: {
      query: UpdateDefaultsDocument,
      variables: {
        input: { job: newJob.number }
      }
    },
    result: {
      data: {
        updateDefaults: {
          ...defaults,
          job: newJob.number
        }
      }
    }
  });
  const { result, waitForNextUpdate } = render(mocks);
  await waitForNextUpdate();
  const [, update1] = result.current;
  await act(() => update1({ job: newJob }));
  const [, update2] = result.current;
  expect(update1).toBe(update2);
});

test("returns loading state", async () => {
  const { result, waitForNextUpdate } = render([]);
  expect(result.current).toEqual([
    {
      defaults: {
        job: undefined,
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
        job: undefined,
        price: undefined
      },
      loading: false
    },
    expect.any(Function)
  ]);
});
