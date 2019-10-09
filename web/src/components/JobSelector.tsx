/** @jsx jsx */
import { jsx } from "@emotion/core";
import TypeaheadInput from "./ui/TypeaheadInput";
import { useMemo } from "react";
import { useJobs } from "../service";
import { Job } from "../entities";

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
  const { jobs } = useJobs();

  const items = useMemo(
    () => jobs.map(job => ({ value: job.number, title: job.number })),
    [jobs]
  );

  return (
    <TypeaheadInput
      {...props}
      items={items}
      value={value ? value.number : undefined}
      onChange={jobNumber => {
        onChange(jobs.find(job => job.number === jobNumber));
      }}
    />
  );
};

export default JobSelector;
