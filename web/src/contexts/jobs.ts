import { useJobsQuery } from "../graphql";

export function usePigJobs() {
  return useJobsQuery({
    variables: {
      input: {
        status: ["Open"],
        postingGroup: ["MKT PIGS", "SOW", "GDU"]
      }
    }
  });
}

export function useScorecardJobs() {
  return useJobsQuery({
    variables: {
      input: {
        status: ["Open"],
        postingGroup: ["FARROW-BE"]
      }
    }
  });
}
