import {
  useDefaultsQuery,
  useUpdateDefaultsMutation,
  DefaultsDocument,
  DefaultsQuery,
  Job
} from "../graphql";
import { useCallback } from "react";
import useJobs from "../contexts/jobs";

export interface DefaultValues {
  job?: Job | null;
  price?: number | null;
}

export type UseDefaultsResult = [
  { defaults: DefaultValues; loading: boolean },
  (input: DefaultValues) => Promise<void>
];

export default function useDefaults(): UseDefaultsResult {
  const { data: { jobs = [] } = {}, loading: loadingJobs } = useJobs();
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
    async ({ price, job }: DefaultValues) => {
      await _update({
        variables: {
          input: {
            ...(price && { price }),
            ...(job && { job: job.number })
          }
        }
      });
    },
    [_update]
  );

  return [
    {
      defaults: {
        job: jobs.find(job => job.number === defaults.job),
        price: defaults.price
      },
      loading: loadingJobs || loadingDefaults
    },
    update
  ];
}
