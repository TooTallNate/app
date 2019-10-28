/** @jsx jsx */
import { jsx } from "@emotion/core";
import TypeaheadInput from "./ui/TypeaheadInput";
import { Job } from "../graphql";
import useJobs from "../contexts/jobs";

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
  const { data: { jobs = [] } = {} } = useJobs();

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
