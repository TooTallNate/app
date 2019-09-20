/** @jsx jsx */
import { jsx } from "@emotion/core";
import TypeaheadInput from "./ui/TypeaheadInput";
import FormLabel from "./ui/FormLabel";
import { Fragment, useMemo } from "react";
import { useJobs } from "../service";
import { Job } from "../entities";

interface JobSelectorProps {
  title: string;
  value?: Job;
  onChange?: (job?: Job) => void;
}

const JobSelector: React.FC<JobSelectorProps> = ({
  title,
  value,
  onChange = () => {}
}) => {
  const { jobs } = useJobs();

  const items = useMemo(
    () => jobs.map(job => ({ value: job.number, title: job.number })),
    [jobs]
  );

  return (
    <Fragment>
      <FormLabel id="group-label">{title}</FormLabel>
      <TypeaheadInput
        labelId="group-label"
        items={items}
        value={value ? value.number : undefined}
        onChange={jobNumber => {
          onChange(jobs.find(job => job.number === jobNumber));
        }}
      />
    </Fragment>
  );
};

export default JobSelector;
