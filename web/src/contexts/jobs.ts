import { useJobsQuery } from "../graphql";

export default function useJobs() {
  return useJobsQuery({
    variables: {
      input: {
        status: ["Open"],
        postingGroup: ["MKT PIGS", "SOW", "GDU"]
      }
    }
  });
}
