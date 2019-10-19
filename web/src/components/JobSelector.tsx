/** @jsx jsx */
import { jsx } from "@emotion/core";
import TypeaheadInput from "./ui/TypeaheadInput";
import { useJobsQuery, Job } from "../graphql";

interface JobSelectorProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "value" | "onChange"
  > {
  value?: Job;
  onChange?: (job?: Job) => void;
}

const JobSelector: React.FC<JobSelectorProps> = ({
  value,
  onChange = () => {},
  ...props
}) => {
  const { data: { jobs = [] } = {} } = useJobsQuery({
    variables: {
      input: {
        status: ["Open"],
        postingGroup: ["MKT PIGS", "SOW", "GDU"]
      }
    }
  });

  return (
    <TypeaheadInput
      {...props}
      items={jobs.map(job => ({ value: job.number, title: job.number }))}
      value={value ? value.number : undefined}
      onChange={jobNumber => {
        onChange(jobs.find(job => job.number === jobNumber));
      }}
    />
  );
};

export default JobSelector;
