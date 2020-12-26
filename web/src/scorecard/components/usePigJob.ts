import { useScorecard } from "../contexts/scorecard";
import { useFormContext } from "react-hook-form";
import { useScorecardPigJobLazyQuery } from "../graphql";
import { useMemo, useEffect } from "react";

export interface UsePigJob {
  job?: {
    number: string;
    description: string;
    deadQuantity?: number | null;
    startDate?: string | null;
  } | null;
  loading: boolean;
}

export default function usePigJob(): UsePigJob {
  const { formState, formConfig } = useScorecard();
  const { watch } = useFormContext();
  const [loadJob, { data, loading }] = useScorecardPigJobLazyQuery();

  // Find the id of the job input
  const jobId = useMemo(() => {
    const jobConfig = formConfig
      .flatMap(page => page.elements)
      .find(element => element.code === "JOB");
    if (jobConfig) return jobConfig.id;
  }, [formConfig]);

  // Check form state first, then
  const jobNumber =
    watch(`${jobId}.stringValue`) ||
    (jobId && formState[jobId] && formState[jobId]!.stringValue) ||
    undefined;

  useEffect(() => {
    if (jobNumber) {
      loadJob({ variables: { job: jobNumber } });
    }
  }, [jobNumber, loadJob]);

  return {
    job: data ? data.job : undefined,
    loading
  };
}
