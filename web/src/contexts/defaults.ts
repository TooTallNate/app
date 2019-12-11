import {
  useDefaultsQuery,
  useUpdateDefaultsMutation,
  DefaultsDocument,
  DefaultsQuery,
  Job
} from "../graphql";
import { useCallback } from "react";
import { usePigJobs, useScorecardJobs } from "./jobs";

export interface DefaultValues {
  pigJob?: Job | null;
  scorecardJob?: Job | null;
  price?: number | null;
}

export type UseDefaultsResult = [
  { defaults: DefaultValues; loading: boolean },
  (input: DefaultValues) => Promise<void>
];

export default function useDefaults(): UseDefaultsResult {
  const {
    data: { jobs: pigJobs = [] } = {},
    loading: loadingPigJobs
  } = usePigJobs();
  const {
    data: { jobs: scorecardJobs = [] } = {},
    loading: loadingScorecardJobs
  } = useScorecardJobs();
  const {
    data: { defaults = {} } = {},
    loading: loadingDefaults
  } = useDefaultsQuery();
  const [_update] = useUpdateDefaultsMutation({
    update(cache, { data }) {
      if (data) {
        cache.writeQuery<DefaultsQuery>({
          query: DefaultsDocument,
          data: {
            defaults: data.updateDefaults
          }
        });
      }
    }
  });

  const update = useCallback(
    async ({ price, pigJob, scorecardJob }: DefaultValues) => {
      await _update({
        variables: {
          input: {
            ...(price && { price }),
            ...(pigJob && { pigJob: pigJob.number }),
            ...(scorecardJob && { scorecardJob: scorecardJob.number })
          }
        }
      });
    },
    [_update]
  );

  return [
    {
      defaults: {
        pigJob: pigJobs.find(job => job.number === defaults.pigJob),
        scorecardJob: scorecardJobs.find(
          job => job.number === defaults.scorecardJob
        ),
        price: defaults.price
      },
      loading: loadingPigJobs || loadingScorecardJobs || loadingDefaults
    },
    update
  ];
}
