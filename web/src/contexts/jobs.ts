import { useJobsQuery, Job } from "../graphql";
import useDefaults from "./defaults";
import { useState, useEffect, useCallback } from "react";

export default function useJobs() {
  const [defaultJob, setDefaultJob] = useState<Job>();
  const [defaults, setDefaults] = useDefaults();
  const { data: { jobs = [] } = {} } = useJobsQuery({
    variables: {
      input: {
        status: ["Open"],
        postingGroup: ["MKT PIGS", "SOW", "GDU"]
      }
    }
  });

  useEffect(() => {
    setDefaultJob(jobs.find(j => j.number === defaults.job));
  }, [defaults.job, jobs]);

  const setDefault = useCallback(
    (job: Job) => setDefaults({ job: job.number }),
    [setDefaults]
  );

  return { jobs, default: defaultJob, setDefault };
}
